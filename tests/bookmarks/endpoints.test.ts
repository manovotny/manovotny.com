import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Bookmark } from "../../src/lib/bookmarks/db/schema";

vi.mock("$env/dynamic/private", () => ({
  env: {
    BOOKMARKS_API_TOKEN: "service-token",
    BOOKMARKS_CAPTURE_TOKEN: "capture-token",
    BOOKMARKS_OWNER_USER_ID: "user_owner",
  },
}));

vi.mock("@vercel/functions", () => ({ waitUntil: vi.fn() }));

// `waitUntil(backfillMetadata(bookmark))` evaluates its argument eagerly, so
// without this mock the "creates" test would start a real fetch.
vi.mock("../../src/lib/bookmarks/metadata", () => ({ fetchMetadata: vi.fn() }));

vi.mock("../../src/lib/bookmarks/db/queries", () => ({
  fillEmptyFields: vi.fn(),
  findByNormalizedUrl: vi.fn(),
  insertBookmark: vi.fn(),
  listBookmarks: vi.fn(),
  listTagCounts: vi.fn(),
  listUntagged: vi.fn(),
  restoreBookmark: vi.fn(),
  softDeleteBookmark: vi.fn(),
  updateBookmark: vi.fn(),
}));

const queries = await import("../../src/lib/bookmarks/db/queries");
const metadata = await import("../../src/lib/bookmarks/metadata");
const { parseLimit } = await import("../../src/lib/bookmarks/service");
const { waitUntil } = await import("@vercel/functions");
const capture =
  await import("../../src/routes/(bookmarks)/api/bookmarks/+server");
const patch =
  await import("../../src/routes/(bookmarks)/api/bookmarks/[id]/+server");
const tags =
  await import("../../src/routes/(bookmarks)/api/bookmarks/tags/+server");
const untagged =
  await import("../../src/routes/(bookmarks)/api/bookmarks/untagged/+server");
const exportRoute =
  await import("../../src/routes/(bookmarks)/api/bookmarks/export/+server");

const row: Bookmark = {
  createdAt: new Date("2026-01-01T00:00:00Z"),
  deletedAt: null,
  description: null,
  domain: "example.com",
  favorite: false,
  httpStatus: null,
  id: "11111111-1111-4111-8111-111111111111",
  image: null,
  lastCheckedAt: null,
  normalizedUrl: "https://example.com/a",
  processedAt: null,
  tags: [],
  title: null,
  updatedAt: new Date("2026-01-01T00:00:00Z"),
  url: "https://example.com/a",
};

function event(
  init: { body?: unknown; method?: string; token?: string },
  params: Record<string, string> = {},
) {
  const request = new Request("http://localhost/api/bookmarks", {
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    headers: {
      ...(init.token && { authorization: `Bearer ${init.token}` }),
      "content-type": "application/json",
    },
    method: init.method ?? "POST",
  });

  // Only the fields the handlers touch; cast keeps the test honest about that.
  return { params, request, url: new URL(request.url) } as never;
}

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(metadata.fetchMetadata).mockResolvedValue({});
});

describe("auth matrix", () => {
  const body = { url: "https://example.com/a" };
  const calls: [string, (token?: string) => Promise<Response>][] = [
    [
      "untagged",
      async (token) => untagged.GET(event({ method: "GET", token })),
    ],
    ["tags", async (token) => tags.GET(event({ method: "GET", token }))],
    [
      "export",
      async (token) => exportRoute.GET(event({ method: "GET", token })),
    ],
    [
      "patch",
      async (token) =>
        patch.PATCH(
          event(
            { body: { tags: ["css"] }, method: "PATCH", token },
            { id: row.id },
          ),
        ),
    ],
  ];

  it("service endpoints reject missing, wrong, and capture tokens", async () => {
    for (const [name, call] of calls) {
      for (const token of [undefined, "wrong", "capture-token"]) {
        await expect(
          call(token),
          `${name} with ${token}`,
        ).rejects.toMatchObject({ status: 401 });
      }
    }

    expect(queries.listUntagged).not.toHaveBeenCalled();
    expect(queries.listTagCounts).not.toHaveBeenCalled();
    expect(queries.listBookmarks).not.toHaveBeenCalled();
    expect(queries.updateBookmark).not.toHaveBeenCalled();
  });

  it("capture rejects missing and wrong tokens without touching the database", async () => {
    for (const token of [undefined, "wrong"]) {
      await expect(capture.POST(event({ body, token }))).rejects.toMatchObject({
        status: 401,
      });
    }

    expect(queries.findByNormalizedUrl).not.toHaveBeenCalled();
  });
});

describe("POST /api/bookmarks", () => {
  it("accepts the capture token, creates, and schedules the backfill", async () => {
    vi.mocked(queries.findByNormalizedUrl).mockResolvedValue(undefined);
    vi.mocked(queries.insertBookmark).mockResolvedValue(row);

    const response = await capture.POST(
      event({ body: { url: "https://example.com/a" }, token: "capture-token" }),
    );

    expect(response.status).toBe(201);
    expect(await response.json()).toMatchObject({
      duplicate: false,
      restored: false,
    });
    expect(waitUntil).toHaveBeenCalledTimes(1);
  });

  it("reports duplicates and restores with 200", async () => {
    vi.mocked(queries.findByNormalizedUrl).mockResolvedValue(row);

    const duplicate = await capture.POST(
      event({ body: { url: "https://example.com/a" }, token: "service-token" }),
    );

    expect(duplicate.status).toBe(200);
    expect(await duplicate.json()).toMatchObject({ duplicate: true });
    expect(waitUntil).not.toHaveBeenCalled();

    vi.mocked(queries.findByNormalizedUrl).mockResolvedValue({
      ...row,
      deletedAt: new Date(),
    });
    vi.mocked(queries.restoreBookmark).mockResolvedValue(row);

    const restored = await capture.POST(
      event({ body: { url: "https://example.com/a" }, token: "service-token" }),
    );

    expect(restored.status).toBe(200);
    expect(await restored.json()).toMatchObject({ restored: true });
  });

  it("returns 400 for malformed JSON, missing url, and invalid url", async () => {
    const malformed = new Request("http://localhost/api/bookmarks", {
      body: "{not json",
      headers: { authorization: "Bearer capture-token" },
      method: "POST",
    });

    await expect(
      capture.POST({
        request: malformed,
        url: new URL(malformed.url),
      } as never),
    ).rejects.toMatchObject({ status: 400 });
    await expect(
      capture.POST(event({ body: {}, token: "capture-token" })),
    ).rejects.toMatchObject({ status: 400 });
    await expect(
      capture.POST(event({ body: { url: "nope" }, token: "capture-token" })),
    ).rejects.toMatchObject({ status: 400 });
  });
});

describe("GET /api/bookmarks/untagged and /export", () => {
  it("clamps the limit and projects untagged rows", async () => {
    vi.mocked(queries.listUntagged).mockResolvedValue([row]);

    const request = new Request(
      "http://localhost/api/bookmarks/untagged?limit=999",
      {
        headers: { authorization: "Bearer service-token" },
      },
    );
    const response = await untagged.GET({
      request,
      url: new URL(request.url),
    } as never);

    expect(queries.listUntagged).toHaveBeenCalledWith(100);
    expect(await response.json()).toEqual([
      { description: null, id: row.id, title: null, url: row.url },
    ]);
  });

  it("parses limit defensively", () => {
    const cases: [string | null, number][] = [
      [null, 25],
      ["abc", 25],
      ["", 25],
      ["0", 1],
      ["-3", 1],
      ["2.5", 2],
      ["999", 100],
      ["40", 40],
    ];

    for (const [raw, expected] of cases) {
      expect(parseLimit(raw), String(raw)).toBe(expected);
    }
  });

  it("exports every live row as JSON", async () => {
    vi.mocked(queries.listBookmarks).mockResolvedValue([row]);

    const response = await exportRoute.GET(
      event({ method: "GET", token: "service-token" }),
    );

    expect(response.headers.get("content-disposition")).toContain(
      "bookmarks.json",
    );
    expect(await response.json()).toHaveLength(1);
  });
});

describe("GET /api/bookmarks/tags", () => {
  it("returns counts for the service token", async () => {
    vi.mocked(queries.listTagCounts).mockResolvedValue([
      { count: 2, tag: "css" },
    ]);

    const response = await tags.GET(
      event({ method: "GET", token: "service-token" }),
    );

    expect(await response.json()).toEqual([{ count: 2, tag: "css" }]);
  });
});

describe("PATCH /api/bookmarks/:id", () => {
  const ok = { method: "PATCH", token: "service-token" };

  it("404s on non-UUID ids and unknown rows", async () => {
    await expect(
      patch.PATCH(event({ ...ok, body: { tags: ["css"] } }, { id: "nope" })),
    ).rejects.toMatchObject({ status: 404 });

    vi.mocked(queries.updateBookmark).mockResolvedValue(undefined);

    await expect(
      patch.PATCH(event({ ...ok, body: { tags: ["css"] } }, { id: row.id })),
    ).rejects.toMatchObject({ status: 404 });
  });

  it("422s on non-public image URLs", async () => {
    await expect(
      patch.PATCH(
        event(
          { ...ok, body: { image: "http://10.0.0.1/x.png" } },
          { id: row.id },
        ),
      ),
    ).rejects.toMatchObject({ status: 422 });
  });

  it("422s on invalid tags, wrong types, and empty patches", async () => {
    const invalid = await patch.PATCH(
      event({ ...ok, body: { tags: ["Bad Tag!"] } }, { id: row.id }),
    );

    expect(invalid.status).toBe(422);
    expect(await invalid.json()).toEqual({
      invalid: ["bad-tag!"],
      message: "Invalid tags",
    });
    await expect(
      patch.PATCH(event({ ...ok, body: { title: 5 } }, { id: row.id })),
    ).rejects.toMatchObject({ status: 422 });
    await expect(
      patch.PATCH(event({ ...ok, body: { unknown: 1 } }, { id: row.id })),
    ).rejects.toMatchObject({ status: 422 });
  });

  it("normalizes tags and marks processed", async () => {
    vi.mocked(queries.updateBookmark).mockResolvedValue(row);

    const response = await patch.PATCH(
      event(
        { ...ok, body: { processed: true, tags: [" CSS ", "Best Practices"] } },
        { id: row.id },
      ),
    );

    expect(response.status).toBe(200);
    expect(queries.updateBookmark).toHaveBeenCalledWith(row.id, {
      processed: true,
      tags: ["best-practices", "css"],
    });
  });
});

describe("/bookmarks page load", () => {
  const load = async (userId: string | null) => {
    const page =
      await import("../../src/routes/(bookmarks)/bookmarks/+page.server");

    return page.load({ locals: { auth: () => ({ userId }) } } as never);
  };

  it("ships no data and touches no database for anonymous visitors", async () => {
    expect(await load(null)).toEqual({ bookmarks: [], tags: [] });
    expect(queries.listBookmarks).not.toHaveBeenCalled();
  });

  it("404s a signed-in stranger", async () => {
    await expect(load("user_other")).rejects.toMatchObject({ status: 404 });
    expect(queries.listBookmarks).not.toHaveBeenCalled();
  });

  it("returns rows for the owner", async () => {
    vi.mocked(queries.listBookmarks).mockResolvedValue([row]);

    const data = (await load("user_owner")) as { bookmarks: unknown[] };

    expect(data.bookmarks).toHaveLength(1);
  });
});

describe("/bookmarks actions", () => {
  const actionEvent = (
    userId: string | null,
    fields: Record<string, string>,
  ) => {
    const form = new FormData();
    for (const [key, value] of Object.entries(fields)) form.set(key, value);

    return {
      locals: { auth: () => ({ userId }) },
      request: new Request("http://localhost/bookmarks", {
        body: form,
        method: "POST",
      }),
    } as never;
  };

  it("rejects anonymous (401) and strangers (404) before touching the database", async () => {
    const page =
      await import("../../src/routes/(bookmarks)/bookmarks/+page.server");
    const attempts = [
      () => page.actions.add(actionEvent(null, { url: "https://example.com" })),
      () => page.actions.delete(actionEvent(null, { id: row.id })),
      () =>
        page.actions.favorite(
          actionEvent("user_other", { favorite: "true", id: row.id }),
        ),
      () =>
        page.actions.update(
          actionEvent("user_other", { id: row.id, tags: "css" }),
        ),
    ];
    const expected = [401, 401, 404, 404];

    for (const [index, attempt] of attempts.entries()) {
      await expect(attempt()).rejects.toMatchObject({
        status: expected[index],
      });
    }

    expect(queries.insertBookmark).not.toHaveBeenCalled();
    expect(queries.softDeleteBookmark).not.toHaveBeenCalled();
    expect(queries.updateBookmark).not.toHaveBeenCalled();
  });

  it("fails inline on a malformed id and on invalid tags for the owner", async () => {
    const page =
      await import("../../src/routes/(bookmarks)/bookmarks/+page.server");

    const badId = await page.actions.delete(
      actionEvent("user_owner", { id: "nope" }),
    );
    expect(badId).toMatchObject({ status: 400 });

    const badTags = await page.actions.update(
      actionEvent("user_owner", { id: row.id, tags: "css, c++" }),
    );
    expect(badTags).toMatchObject({ data: { id: row.id }, status: 422 });
    expect(queries.updateBookmark).not.toHaveBeenCalled();
  });

  it("marks a manual tag edit as processed", async () => {
    const page =
      await import("../../src/routes/(bookmarks)/bookmarks/+page.server");
    vi.mocked(queries.updateBookmark).mockResolvedValue(row);

    await page.actions.update(
      actionEvent("user_owner", {
        id: row.id,
        tags: "CSS, learning",
        title: " T ",
      }),
    );

    expect(queries.updateBookmark).toHaveBeenCalledWith(row.id, {
      processed: true,
      tags: ["css", "learning"],
      title: "T",
    });
  });
});
