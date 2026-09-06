import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("$app/environment", () => ({ dev: false }));
vi.mock("$env/dynamic/private", () => ({
  env: { CRON_SECRET: "cron-secret" },
}));
vi.mock("../../src/lib/bookmarks/link-check", () => ({ checkLink: vi.fn() }));
vi.mock("../../src/lib/bookmarks/db/queries", () => ({
  listStaleLinks: vi.fn(),
  recordLinkCheck: vi.fn(),
}));

const queries = await import("../../src/lib/bookmarks/db/queries");
const { checkLink } = await import("../../src/lib/bookmarks/link-check");
const { GET } =
  await import("../../src/routes/(bookmarks)/api/bookmarks/cron/check-links/+server");

const call = (authorization?: string) =>
  GET({
    request: new Request("http://localhost/api/bookmarks/cron/check-links", {
      headers: authorization ? { authorization } : {},
    }),
  } as never);

const rows = ["a", "b", "c"].map((id) => ({
  id,
  url: `https://${id}.example.com`,
}));

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(queries.listStaleLinks).mockResolvedValue(rows as never);
  vi.mocked(checkLink).mockResolvedValue(200);
});

describe("check-links cron", () => {
  it("rejects a missing or wrong bearer", async () => {
    expect((await call()).status).toBe(401);
    expect((await call("Bearer nope")).status).toBe(401);
    expect(queries.listStaleLinks).not.toHaveBeenCalled();
  });

  it("processes every row for the right secret", async () => {
    expect((await call("Bearer cron-secret")).status).toBe(200);
    expect(queries.recordLinkCheck).toHaveBeenCalledTimes(3);
  });

  it("keeps going when one row fails", async () => {
    vi.mocked(queries.recordLinkCheck)
      .mockRejectedValueOnce(new Error("db hiccup"))
      .mockResolvedValue();

    expect((await call("Bearer cron-secret")).status).toBe(200);
    expect(queries.recordLinkCheck).toHaveBeenCalledTimes(3);
  });
});
