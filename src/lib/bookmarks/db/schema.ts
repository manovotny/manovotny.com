import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const bookmarks = pgTable(
  "bookmarks",
  {
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    description: text(),
    domain: text().notNull(),
    favorite: boolean().default(false).notNull(),
    httpStatus: integer("http_status"),
    id: uuid().defaultRandom().primaryKey(),
    image: text(),
    lastCheckedAt: timestamp("last_checked_at", { withTimezone: true }),
    // Dupe identity; see url.ts normalizeUrl.
    normalizedUrl: text("normalized_url").notNull(),
    // Null = the tagging routine hasn't handled this row yet.
    processedAt: timestamp("processed_at", { withTimezone: true }),
    tags: text()
      .array()
      .default(sql`'{}'::text[]`)
      .notNull(),
    title: text(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    url: text().notNull(),
  },
  (table) => [
    uniqueIndex("idx_bookmarks_normalized_url").on(table.normalizedUrl),
    index("idx_bookmarks_tags").using("gin", table.tags),
    index("idx_bookmarks_created_at").on(table.createdAt.desc()),
  ],
);

export type Bookmark = typeof bookmarks.$inferSelect;
export type NewBookmark = typeof bookmarks.$inferInsert;
