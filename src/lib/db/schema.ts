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
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp({ withTimezone: true }),
    description: text(),
    domain: text().notNull(),
    favorite: boolean().default(false).notNull(),
    httpStatus: integer(),
    id: uuid().defaultRandom().primaryKey(),
    image: text(),
    lastCheckedAt: timestamp({ withTimezone: true }),
    // Dupe identity; see url.ts normalizeUrl.
    normalizedUrl: text().notNull(),
    // Null = the tagging routine hasn't handled this row yet.
    processedAt: timestamp({ withTimezone: true }),
    tags: text()
      .array()
      .default(sql`'{}'::text[]`)
      .notNull(),
    title: text(),
    updatedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
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
