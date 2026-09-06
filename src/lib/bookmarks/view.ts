import type { Bookmark } from "./db/schema";

// The user's zone. Captures are timestamps, not dates, so the site's UTC
// date-only formatter would show the wrong day late in the evening.
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "America/Chicago",
  year: "numeric",
});

// Serializable, client-safe shape. Dates are formatted here, on the server,
// so no component ever calls `new Date()` during SSR.
export type BookmarkView = {
  createdAt: string;
  createdAtLabel: string;
  description: string | null;
  domain: string;
  favorite: boolean;
  httpStatus: number | null;
  id: string;
  image: string | null;
  processed: boolean;
  tags: string[];
  title: string | null;
  url: string;
};

export function toBookmarkView(bookmark: Bookmark): BookmarkView {
  const createdAt = bookmark.createdAt.toISOString();

  return {
    createdAt,
    createdAtLabel: dateFormatter.format(bookmark.createdAt),
    description: bookmark.description,
    domain: bookmark.domain,
    favorite: bookmark.favorite,
    httpStatus: bookmark.httpStatus,
    id: bookmark.id,
    image: bookmark.image,
    processed: bookmark.processedAt !== null,
    tags: bookmark.tags,
    title: bookmark.title,
    url: bookmark.url,
  };
}
