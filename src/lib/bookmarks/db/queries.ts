import { db } from "./index";
import { bookmarks } from "./schema";
import { and, asc, desc, eq, isNull, sql } from "drizzle-orm";
import type { Bookmark, NewBookmark } from "./schema";

export type BookmarkPatch = Partial<
  Pick<Bookmark, "description" | "favorite" | "image" | "tags" | "title">
> & { processed?: boolean };

const notDeleted = isNull(bookmarks.deletedAt);

export async function findByNormalizedUrl(
  normalizedUrl: string,
): Promise<Bookmark | undefined> {
  const [row] = await db
    .select()
    .from(bookmarks)
    .where(eq(bookmarks.normalizedUrl, normalizedUrl))
    .limit(1);

  return row;
}

export function listBookmarks(): Promise<Bookmark[]> {
  return db
    .select()
    .from(bookmarks)
    .where(notDeleted)
    .orderBy(desc(bookmarks.createdAt));
}

export function listUntagged(limit: number): Promise<Bookmark[]> {
  return db
    .select()
    .from(bookmarks)
    .where(and(notDeleted, isNull(bookmarks.processedAt)))
    .orderBy(asc(bookmarks.createdAt))
    .limit(limit);
}

export async function listTagCounts(): Promise<
  { count: number; tag: string }[]
> {
  const rows = await db.execute<{ count: string; tag: string }>(sql`
    select tag, count(*)::text as count
    from ${bookmarks}, unnest(${bookmarks.tags}) as tag
    where ${bookmarks.deletedAt} is null
    group by tag
    order by count(*) desc, tag asc
  `);

  return rows.rows.map((row) => ({ count: Number(row.count), tag: row.tag }));
}

export async function insertBookmark(values: NewBookmark): Promise<Bookmark> {
  const [row] = await db.insert(bookmarks).values(values).returning();

  return row!;
}

export async function restoreBookmark(
  id: string,
): Promise<Bookmark | undefined> {
  const [row] = await db
    .update(bookmarks)
    .set({ deletedAt: null, updatedAt: sql`now()` })
    .where(eq(bookmarks.id, id))
    .returning();

  return row;
}

export async function updateBookmark(
  id: string,
  patch: BookmarkPatch,
): Promise<Bookmark | undefined> {
  const { processed, ...fields } = patch;
  const [row] = await db
    .update(bookmarks)
    .set({
      ...fields,
      ...(processed && { processedAt: sql`now()` }),
      updatedAt: sql`now()`,
    })
    .where(and(eq(bookmarks.id, id), notDeleted))
    .returning();

  return row;
}

export async function softDeleteBookmark(id: string): Promise<boolean> {
  const rows = await db
    .update(bookmarks)
    .set({ deletedAt: sql`now()`, updatedAt: sql`now()` })
    .where(and(eq(bookmarks.id, id), notDeleted))
    .returning({ id: bookmarks.id });

  return rows.length > 0;
}

// Concurrency-safe backfill: each column only changes if it is still null at
// UPDATE time, so a title the user typed while metadata was fetching wins.
export async function fillEmptyFields(
  id: string,
  fields: { description?: string; image?: string; title?: string },
): Promise<void> {
  await db
    .update(bookmarks)
    .set({
      ...(fields.description !== undefined && {
        description: sql`coalesce(${bookmarks.description}, ${fields.description})`,
      }),
      ...(fields.image !== undefined && {
        image: sql`coalesce(${bookmarks.image}, ${fields.image})`,
      }),
      ...(fields.title !== undefined && {
        title: sql`coalesce(${bookmarks.title}, ${fields.title})`,
      }),
      updatedAt: sql`now()`,
    })
    .where(and(eq(bookmarks.id, id), notDeleted));
}

export function listStaleLinks(limit: number): Promise<Bookmark[]> {
  return db
    .select()
    .from(bookmarks)
    .where(notDeleted)
    .orderBy(sql`${bookmarks.lastCheckedAt} asc nulls first`)
    .limit(limit);
}

export async function recordLinkCheck(
  id: string,
  httpStatus: number,
): Promise<void> {
  await db
    .update(bookmarks)
    .set({ httpStatus, lastCheckedAt: sql`now()` })
    .where(eq(bookmarks.id, id));
}
