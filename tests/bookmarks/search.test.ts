import {
  applyFilters,
  buildIndex,
  countTags,
  defaultFilters,
  filtersFromParams,
  filtersToParams,
  isBrokenStatus,
  parseQuery,
  sortBookmarks,
} from "../../src/lib/bookmarks/search";
import { describe, expect, it } from "vitest";
import type { BookmarkView } from "../../src/lib/bookmarks/view";

function view(overrides: Partial<BookmarkView> & { id: string }): BookmarkView {
  return {
    createdAt: "2026-01-01T00:00:00.000Z",
    createdAtLabel: "Jan 1, 2026",
    description: null,
    domain: "example.com",
    favorite: false,
    httpStatus: null,
    image: null,
    processed: true,
    tags: [],
    title: null,
    url: "https://example.com",
    ...overrides,
  };
}

const bookmarks: BookmarkView[] = [
  view({
    createdAt: "2026-03-01T00:00:00.000Z",
    id: "a",
    tags: ["css", "animation"],
    title: "Animating SVG with CSS",
  }),
  view({
    createdAt: "2026-02-01T00:00:00.000Z",
    description: "A modern SSH client for iOS.",
    favorite: true,
    id: "b",
    tags: ["ios", "app"],
    title: "Echo",
  }),
  view({
    createdAt: "2026-01-01T00:00:00.000Z",
    httpStatus: 404,
    id: "c",
    processed: false,
    tags: [],
    title: "Broken thing",
    url: "https://dead.example.com/x",
  }),
];

const index = buildIndex(bookmarks);

describe("parseQuery", () => {
  it("splits #tags from free text", () => {
    expect(parseQuery("svg #css  #Animation trick")).toEqual({
      tags: ["css", "animation"],
      text: "svg trick",
    });
  });

  it("ignores a bare hash", () => {
    expect(parseQuery("#")).toEqual({ tags: [], text: "#" });
  });
});

describe("applyFilters", () => {
  it("returns everything newest-first by default", () => {
    expect(
      applyFilters(bookmarks, index, defaultFilters).map((b) => b.id),
    ).toEqual(["a", "b", "c"]);
  });

  it("fuzzy/prefix matches text across title and description", () => {
    expect(
      applyFilters(bookmarks, index, { ...defaultFilters, query: "ssh" }).map(
        (b) => b.id,
      ),
    ).toEqual(["b"]);
    expect(
      applyFilters(bookmarks, index, { ...defaultFilters, query: "anim" }).map(
        (b) => b.id,
      ),
    ).toEqual(["a"]);
  });

  it("ANDs tag filters from the dropdown and #tokens", () => {
    expect(
      applyFilters(bookmarks, index, {
        ...defaultFilters,
        query: "#animation",
        tags: ["css"],
      }).map((b) => b.id),
    ).toEqual(["a"]);
    expect(
      applyFilters(bookmarks, index, {
        ...defaultFilters,
        tags: ["css", "ios"],
      }),
    ).toEqual([]);
  });

  it("applies favorites, untagged, and broken toggles", () => {
    expect(
      applyFilters(bookmarks, index, {
        ...defaultFilters,
        favorites: true,
      }).map((b) => b.id),
    ).toEqual(["b"]);
    expect(
      applyFilters(bookmarks, index, { ...defaultFilters, untagged: true }).map(
        (b) => b.id,
      ),
    ).toEqual(["c"]);
    expect(
      applyFilters(bookmarks, index, { ...defaultFilters, broken: true }).map(
        (b) => b.id,
      ),
    ).toEqual(["c"]);
  });
});

describe("sortBookmarks", () => {
  it("sorts oldest and by title", () => {
    expect(sortBookmarks(bookmarks, "oldest").map((b) => b.id)).toEqual([
      "c",
      "b",
      "a",
    ]);
    expect(sortBookmarks(bookmarks, "title").map((b) => b.id)).toEqual([
      "a",
      "c",
      "b",
    ]);
  });
});

describe("countTags", () => {
  it("counts and orders alphabetically regardless of count", () => {
    const withRepeat = [
      ...bookmarks,
      view({ id: "d", tags: ["ios", "css"] }),
      view({ id: "e", tags: ["ios"] }),
    ];

    expect(countTags(withRepeat)).toEqual([
      { count: 1, tag: "animation" },
      { count: 1, tag: "app" },
      { count: 2, tag: "css" },
      { count: 3, tag: "ios" },
    ]);
  });
});

describe("isBrokenStatus", () => {
  it("treats bot-block codes as alive and 0 as unreachable", () => {
    expect(isBrokenStatus(404)).toBe(true);
    expect(isBrokenStatus(500)).toBe(true);
    expect(isBrokenStatus(0)).toBe(true);
    expect(isBrokenStatus(403)).toBe(false);
    expect(isBrokenStatus(429)).toBe(false);
    expect(isBrokenStatus(200)).toBe(false);
    expect(isBrokenStatus(null)).toBe(false);
  });
});

describe("toBookmarkView", () => {
  it("formats the created date in America/Chicago", async () => {
    const { toBookmarkView } = await import("../../src/lib/bookmarks/view");
    const view = toBookmarkView({
      createdAt: new Date("2026-03-02T04:30:00Z"), // 10:30 PM Mar 1 in Chicago
      deletedAt: null,
      description: null,
      domain: "example.com",
      favorite: false,
      httpStatus: null,
      id: "x",
      image: null,
      lastCheckedAt: null,
      normalizedUrl: "https://example.com",
      processedAt: null,
      tags: [],
      title: null,
      updatedAt: new Date("2026-03-02T04:30:00Z"),
      url: "https://example.com",
    });

    expect(view.createdAtLabel).toBe("Mar 1, 2026");
    expect(view.processed).toBe(false);
  });
});

describe("filters <-> params", () => {
  it("round-trips and omits defaults", () => {
    const filters = {
      broken: true,
      favorites: false,
      query: "svg #css",
      sort: "title" as const,
      tags: ["css", "svg"],
      untagged: true,
    };
    const params = filtersToParams(filters);

    expect(params.toString()).toBe(
      "q=svg+%23css&tags=css%2Csvg&sort=title&untagged=1&broken=1",
    );
    expect(filtersFromParams(params)).toEqual(filters);
    expect(filtersToParams(defaultFilters).toString()).toBe("");
    expect(filtersFromParams(new URLSearchParams("sort=bogus"))).toEqual(
      defaultFilters,
    );
  });
});
