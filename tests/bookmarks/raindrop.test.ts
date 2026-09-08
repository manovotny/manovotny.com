import { mapRaindropRow } from "../../src/lib/bookmarks/raindrop";
import { describe, expect, it } from "vitest";

const row = {
  cover: "https://replay.software/echo/opengraph-26.png",
  created: "2026-08-13T03:29:07.857Z",
  excerpt: "A modern SSH and Mosh client for iOS.",
  favorite: "false",
  folder: "Unsorted",
  highlights: "",
  id: "1818804345",
  note: "",
  tags: "ios, app",
  title: "Echo",
  url: "https://replay.software/echo",
};

describe("mapRaindropRow", () => {
  it("maps columns, splits tags, and marks the row processed at creation", () => {
    expect(mapRaindropRow(row)).toEqual({
      bookmark: {
        createdAt: new Date("2026-08-13T03:29:07.857Z"),
        description: "A modern SSH and Mosh client for iOS.",
        domain: "replay.software",
        favorite: false,
        image: "https://replay.software/echo/opengraph-26.png",
        normalizedUrl: "https://replay.software/echo",
        processedAt: new Date("2026-08-13T03:29:07.857Z"),
        tags: ["app", "ios"],
        title: "Echo",
        url: "https://replay.software/echo",
      },
    });
  });

  it("stores nulls for blank optional columns and true favorites", () => {
    const result = mapRaindropRow({
      ...row,
      cover: "",
      excerpt: "",
      favorite: "true",
      title: "",
    });

    expect(result).toEqual({
      bookmark: expect.objectContaining({
        description: null,
        favorite: true,
        image: null,
        title: null,
      }),
    });
  });

  it("drops tags that can't be normalized", () => {
    expect(mapRaindropRow({ ...row, tags: "C++, Data Visualisation" })).toEqual(
      {
        bookmark: expect.objectContaining({ tags: ["data-visualisation"] }),
      },
    );
  });

  it("reports invalid URLs and dates instead of throwing", () => {
    expect(mapRaindropRow({ ...row, url: "nope" })).toEqual({
      error: "Invalid URL: nope",
    });
    expect(mapRaindropRow({ ...row, created: "yesterday" })).toEqual({
      error: "Invalid created date: yesterday",
    });
  });
});
