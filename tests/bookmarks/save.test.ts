import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Bookmark } from "../../src/lib/bookmarks/db/schema";

vi.mock("../../src/lib/bookmarks/db/queries", () => ({
  fillEmptyFields: vi.fn(),
  findByNormalizedUrl: vi.fn(),
  insertBookmark: vi.fn(),
  restoreBookmark: vi.fn(),
}));

vi.mock("../../src/lib/bookmarks/metadata", () => ({
  fetchMetadata: vi.fn(),
}));

const queries = await import("../../src/lib/bookmarks/db/queries");
const metadata = await import("../../src/lib/bookmarks/metadata");
const { backfillMetadata, decideSaveOutcome, saveBookmark } =
  await import("../../src/lib/bookmarks/save");

const base: Bookmark = {
  createdAt: new Date("2026-01-01T00:00:00Z"),
  deletedAt: null,
  description: null,
  domain: "example.com",
  favorite: false,
  httpStatus: null,
  id: "00000000-0000-0000-0000-000000000001",
  image: null,
  lastCheckedAt: null,
  normalizedUrl: "https://example.com/a",
  processedAt: null,
  tags: [],
  title: null,
  updatedAt: new Date("2026-01-01T00:00:00Z"),
  url: "https://example.com/a",
};

beforeEach(() => {
  vi.resetAllMocks();
});

describe("decideSaveOutcome", () => {
  it("creates when nothing exists", () => {
    expect(decideSaveOutcome(undefined)).toBe("created");
  });

  it("reports a duplicate for a live row", () => {
    expect(decideSaveOutcome(base)).toBe("duplicate");
  });

  it("restores a soft-deleted row", () => {
    expect(decideSaveOutcome({ ...base, deletedAt: new Date() })).toBe(
      "restored",
    );
  });
});

describe("saveBookmark", () => {
  it("inserts a normalized row with the provided title", async () => {
    vi.mocked(queries.findByNormalizedUrl).mockResolvedValue(undefined);
    vi.mocked(queries.insertBookmark).mockResolvedValue({
      ...base,
      title: "Hello",
    });

    const result = await saveBookmark({
      title: "Hello",
      url: "https://www.example.com/a?utm_source=x",
    });

    expect(result.outcome).toBe("created");
    expect(queries.insertBookmark).toHaveBeenCalledWith({
      domain: "example.com",
      normalizedUrl: "https://example.com/a",
      title: "Hello",
      url: "https://www.example.com/a",
    });
  });

  it("returns the existing row for a duplicate without writing", async () => {
    vi.mocked(queries.findByNormalizedUrl).mockResolvedValue(base);

    const result = await saveBookmark({ url: "https://example.com/a/" });

    expect(result).toEqual({ bookmark: base, outcome: "duplicate" });
    expect(queries.insertBookmark).not.toHaveBeenCalled();
    expect(queries.restoreBookmark).not.toHaveBeenCalled();
  });

  it("restores a soft-deleted row", async () => {
    vi.mocked(queries.findByNormalizedUrl).mockResolvedValue({
      ...base,
      deletedAt: new Date(),
    });
    vi.mocked(queries.restoreBookmark).mockResolvedValue(base);

    const result = await saveBookmark({ url: "https://example.com/a" });

    expect(result.outcome).toBe("restored");
    expect(queries.restoreBookmark).toHaveBeenCalledWith(base.id);
  });

  it("stores null when the title is blank", async () => {
    vi.mocked(queries.findByNormalizedUrl).mockResolvedValue(undefined);
    vi.mocked(queries.insertBookmark).mockResolvedValue(base);

    await saveBookmark({ title: "   ", url: "https://example.com/a" });

    expect(queries.insertBookmark).toHaveBeenCalledWith(
      expect.objectContaining({ title: null }),
    );
  });

  it("propagates InvalidUrlError", async () => {
    await expect(saveBookmark({ url: "nope" })).rejects.toThrow("Invalid URL");
  });

  it("treats a unique-violation race as a duplicate", async () => {
    vi.mocked(queries.findByNormalizedUrl)
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce(base);
    vi.mocked(queries.insertBookmark).mockRejectedValue(
      Object.assign(new Error("duplicate key"), { code: "23505" }),
    );

    const result = await saveBookmark({ url: "https://example.com/a" });

    expect(result).toEqual({ bookmark: base, outcome: "duplicate" });
    expect(queries.findByNormalizedUrl).toHaveBeenCalledTimes(2);
  });

  it("restores a soft-deleted winner after a race", async () => {
    const deleted = { ...base, deletedAt: new Date() };
    vi.mocked(queries.findByNormalizedUrl)
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce(deleted);
    vi.mocked(queries.insertBookmark).mockRejectedValue(
      Object.assign(new Error("duplicate key"), { code: "23505" }),
    );
    vi.mocked(queries.restoreBookmark).mockResolvedValue(base);

    const result = await saveBookmark({ url: "https://example.com/a" });

    expect(result).toEqual({ bookmark: base, outcome: "restored" });
    expect(queries.restoreBookmark).toHaveBeenCalledWith(base.id);
  });

  it("rethrows non-unique database errors", async () => {
    vi.mocked(queries.findByNormalizedUrl).mockResolvedValue(undefined);
    vi.mocked(queries.insertBookmark).mockRejectedValue(new Error("boom"));

    await expect(
      saveBookmark({ url: "https://example.com/a" }),
    ).rejects.toThrow("boom");
  });
});

describe("backfillMetadata", () => {
  it("hands every fetched field to the coalescing update", async () => {
    vi.mocked(metadata.fetchMetadata).mockResolvedValue({
      description: "D",
      image: "https://example.com/i.png",
      title: "Fetched",
    });

    await backfillMetadata({ ...base, title: "Kept" });

    expect(queries.fillEmptyFields).toHaveBeenCalledWith(base.id, {
      description: "D",
      image: "https://example.com/i.png",
      title: "Fetched",
    });
  });

  it("does nothing when nothing was fetched", async () => {
    vi.mocked(metadata.fetchMetadata).mockResolvedValue({});

    await backfillMetadata(base);

    expect(queries.fillEmptyFields).not.toHaveBeenCalled();
  });

  it("swallows database failures", async () => {
    vi.mocked(metadata.fetchMetadata).mockResolvedValue({ title: "T" });
    vi.mocked(queries.fillEmptyFields).mockRejectedValue(new Error("db down"));

    await expect(backfillMetadata(base)).resolves.toBeUndefined();
  });
});
