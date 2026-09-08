import {
  isBookmarksPagePath,
  isBookmarksPath,
  isBookmarksRouteFile,
} from "../../src/lib/bookmarks/paths";
import { describe, expect, it } from "vitest";

describe("isBookmarksPath", () => {
  it("matches the page and API prefixes exactly", () => {
    expect(isBookmarksPath("/bookmarks")).toBe(true);
    expect(isBookmarksPath("/bookmarks/")).toBe(true);
    expect(isBookmarksPath("/api/bookmarks")).toBe(true);
    expect(isBookmarksPath("/api/bookmarks/untagged")).toBe(true);
  });

  it("does not match look-alikes or site routes", () => {
    expect(isBookmarksPath("/bookmarksy")).toBe(false);
    expect(isBookmarksPath("/api/og-image")).toBe(false);
    expect(isBookmarksPath("/")).toBe(false);
    expect(isBookmarksPath("/notes")).toBe(false);
  });
});

describe("isBookmarksPagePath", () => {
  it("matches pages but not the API", () => {
    expect(isBookmarksPagePath("/bookmarks")).toBe(true);
    expect(isBookmarksPagePath("/bookmarks/anything")).toBe(true);
    expect(isBookmarksPagePath("/api/bookmarks")).toBe(false);
  });
});

describe("isBookmarksRouteFile", () => {
  it("recognizes the route group in import.meta.glob keys", () => {
    expect(
      isBookmarksRouteFile("/src/routes/(bookmarks)/bookmarks/+page.svelte"),
    ).toBe(true);
    expect(isBookmarksRouteFile("/src/routes/(notes)/flash/+page.md")).toBe(
      false,
    );
  });
});
