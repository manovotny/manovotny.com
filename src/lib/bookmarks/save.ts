import {
  fillEmptyFields,
  findByNormalizedUrl,
  insertBookmark,
  restoreBookmark,
} from "./db/queries";
import { fetchMetadata } from "./metadata";
import { isPublicHttpUrl, normalizeUrl } from "./url";
import type { Bookmark } from "./db/schema";

export type SaveOutcome = "created" | "duplicate" | "restored";

export type SaveInput = {
  title?: string;
  url: string;
};

export type SaveResult = {
  bookmark: Bookmark;
  outcome: SaveOutcome;
};

export function decideSaveOutcome(existing: Bookmark | undefined): SaveOutcome {
  if (!existing) {
    return "created";
  }

  return existing.deletedAt ? "restored" : "duplicate";
}

export async function saveBookmark(input: SaveInput): Promise<SaveResult> {
  const { domain, normalizedUrl, url } = normalizeUrl(input.url);
  const existing = await findByNormalizedUrl(normalizedUrl);
  const outcome = decideSaveOutcome(existing);

  if (outcome === "duplicate") {
    return { bookmark: existing!, outcome };
  }

  if (outcome === "restored") {
    const restored = await restoreBookmark(existing!.id);

    return { bookmark: restored ?? existing!, outcome };
  }

  const title = input.title?.trim() || null;

  try {
    const bookmark = await insertBookmark({
      domain,
      normalizedUrl,
      title,
      url,
    });

    return { bookmark, outcome };
  } catch (caught) {
    // Two saves of the same URL raced past the lookup; the unique index
    // caught it. Re-read and report what the other request created.
    if (isUniqueViolation(caught)) {
      const winner = await findByNormalizedUrl(normalizedUrl);

      if (winner?.deletedAt) {
        const restored = await restoreBookmark(winner.id);

        return { bookmark: restored ?? winner, outcome: "restored" };
      }

      if (winner) {
        return { bookmark: winner, outcome: "duplicate" };
      }
    }

    throw caught;
  }
}

function isUniqueViolation(caught: unknown): boolean {
  if (typeof caught !== "object" || caught === null) {
    return false;
  }

  if ("code" in caught && caught.code === "23505") {
    return true;
  }

  return "cause" in caught && isUniqueViolation(caught.cause);
}

// Runs after the capture response has been sent (see the POST endpoint).
// The UPDATE itself is conditional per column (fillEmptyFields), so a value
// written by the user or the routine meanwhile is never overwritten. Never
// throws.
export async function backfillMetadata(
  bookmark: Bookmark,
  fetcher?: typeof fetch,
): Promise<void> {
  try {
    const { image, ...rest } = await fetchMetadata(bookmark.url, fetcher);
    // Images are hotlinked by the browser; never store a non-public one.
    const fetched = image && isPublicHttpUrl(image) ? { ...rest, image } : rest;

    if (Object.keys(fetched).length === 0) {
      return;
    }

    await fillEmptyFields(bookmark.id, fetched);
  } catch (caught) {
    console.error("backfillMetadata failed", bookmark.id, caught);
  }
}
