import { bookmarks } from "../../src/lib/bookmarks/db/schema";
import { getTableConfig } from "drizzle-orm/pg-core";
import { describe, expect, it } from "vitest";

describe("bookmarks schema", () => {
  const config = getTableConfig(bookmarks);
  const columnNames = config.columns.map((column) => column.name).sort();

  it("uses the snake_case table name", () => {
    expect(config.name).toBe("bookmarks");
  });

  it("has exactly the spec's columns", () => {
    expect(columnNames).toEqual([
      "created_at",
      "deleted_at",
      "description",
      "domain",
      "favorite",
      "http_status",
      "id",
      "image",
      "last_checked_at",
      "normalized_url",
      "processed_at",
      "tags",
      "title",
      "updated_at",
      "url",
    ]);
  });

  it("enforces a unique index on normalized_url", () => {
    const unique = config.indexes.find(
      (index) => index.config.name === "idx_bookmarks_normalized_url",
    );

    expect(unique?.config.unique).toBe(true);
  });

  it("indexes tags with GIN", () => {
    const gin = config.indexes.find(
      (index) => index.config.name === "idx_bookmarks_tags",
    );

    expect(gin?.config.method).toBe("gin");
  });
});
