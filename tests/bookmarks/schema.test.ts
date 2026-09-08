import { readFileSync } from "node:fs";

import { bookmarks } from "../../src/db/schema";
import { getTableColumns } from "drizzle-orm";
import { getTableConfig } from "drizzle-orm/pg-core";
import { describe, expect, it } from "vitest";

// Column names come from `casing: "snake_case"` (drizzle-kit config and the
// client), not from the schema, so snake_case is asserted on the generated
// migration rather than on the table object.
const migration = readFileSync(
  "src/db/migrations/0000_giant_retro_girl.sql",
  "utf8",
);

describe("bookmarks schema", () => {
  const config = getTableConfig(bookmarks);

  it("uses the snake_case table name", () => {
    expect(config.name).toBe("bookmarks");
  });

  it("has exactly the spec's columns", () => {
    expect(Object.keys(getTableColumns(bookmarks)).sort()).toEqual([
      "createdAt",
      "description",
      "domain",
      "favorite",
      "httpStatus",
      "id",
      "image",
      "lastCheckedAt",
      "normalizedUrl",
      "processedAt",
      "tags",
      "title",
      "updatedAt",
      "url",
    ]);
  });

  it("migrates multi-word columns as snake_case", () => {
    for (const column of [
      "created_at",
      "http_status",
      "last_checked_at",
      "normalized_url",
      "processed_at",
      "updated_at",
    ]) {
      expect(migration, column).toContain(`"${column}"`);
    }
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
