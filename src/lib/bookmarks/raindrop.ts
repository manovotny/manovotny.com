import { isValidTag, normalizeTags } from "./tags";
import { InvalidUrlError, normalizeUrl } from "./url";
import type { NewBookmark } from "./db/schema";

export type RaindropRow = Record<string, string>;

export type MappedRow = { bookmark: NewBookmark } | { error: string };

export function mapRaindropRow(row: RaindropRow): MappedRow {
  let normalized: ReturnType<typeof normalizeUrl>;

  try {
    normalized = normalizeUrl(row.url ?? "");
  } catch (caught) {
    if (caught instanceof InvalidUrlError) {
      return { error: caught.message };
    }

    throw caught;
  }

  const createdAt = new Date(row.created ?? "");

  if (Number.isNaN(createdAt.getTime())) {
    return { error: `Invalid created date: ${row.created}` };
  }

  return {
    bookmark: {
      createdAt,
      description: row.excerpt?.trim() || null,
      domain: normalized.domain,
      favorite: row.favorite === "true",
      image: row.cover?.trim() || null,
      normalizedUrl: normalized.normalizedUrl,
      // Raindrop rows were tagged by hand; nothing for the routine to do.
      processedAt: createdAt,
      tags: normalizeTags((row.tags ?? "").split(",")).filter(isValidTag),
      title: row.title?.trim() || null,
      url: normalized.url,
    },
  };
}
