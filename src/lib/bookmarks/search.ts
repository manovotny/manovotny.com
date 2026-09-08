import MiniSearch from "minisearch";
import type { BookmarkView } from "./view";

export type SortOrder = "newest" | "oldest" | "title";

export type Filters = {
  broken: boolean;
  favorites: boolean;
  query: string;
  sort: SortOrder;
  tags: string[];
  untagged: boolean;
};

export const defaultFilters: Filters = {
  broken: false,
  favorites: false,
  query: "",
  sort: "newest",
  tags: [],
  untagged: false,
};

// Sites that answer HEAD/GET from an unknown client with these codes are
// blocking bots, not dead.
const BOT_BLOCK_STATUSES = new Set([401, 403, 405, 429, 999]);

// 0 = the checker could not reach the host at all (DNS/TLS/timeout).
export function isBrokenStatus(status: number | null): boolean {
  if (status === null) {
    return false;
  }

  return status === 0 || (status >= 400 && !BOT_BLOCK_STATUSES.has(status));
}

// "svg #css trick" -> text "svg trick", tags ["css"]
export function parseQuery(query: string): { tags: string[]; text: string } {
  const tags: string[] = [];
  const words: string[] = [];

  for (const token of query.trim().split(/\s+/)) {
    if (token.startsWith("#") && token.length > 1) {
      tags.push(token.slice(1).toLowerCase());
    } else if (token) {
      words.push(token);
    }
  }

  return { tags, text: words.join(" ") };
}

export function buildIndex(
  bookmarks: BookmarkView[],
): MiniSearch<BookmarkView> {
  const index = new MiniSearch<BookmarkView>({
    extractField: (document, fieldName) => {
      const value = document[fieldName as keyof BookmarkView];

      return Array.isArray(value) ? value.join(" ") : String(value ?? "");
    },
    fields: ["description", "domain", "tags", "title", "url"],
    idField: "id",
    searchOptions: {
      boost: { tags: 3, title: 2 },
      fuzzy: 0.2,
      prefix: true,
    },
  });

  index.addAll(bookmarks);

  return index;
}

export function sortBookmarks(
  bookmarks: BookmarkView[],
  sort: SortOrder,
): BookmarkView[] {
  const copy = [...bookmarks];

  switch (sort) {
    case "oldest":
      return copy.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    case "title":
      return copy.sort((a, b) =>
        (a.title ?? a.url).localeCompare(b.title ?? b.url, undefined, {
          sensitivity: "base",
        }),
      );
    default:
      return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
}

export function applyFilters(
  bookmarks: BookmarkView[],
  index: MiniSearch<BookmarkView>,
  filters: Filters,
): BookmarkView[] {
  const { tags: queryTags, text } = parseQuery(filters.query);
  const requiredTags = [...new Set([...filters.tags, ...queryTags])];
  const matchedIds = text
    ? new Set(index.search(text).map((result) => String(result.id)))
    : undefined;

  const filtered = bookmarks.filter(
    (bookmark) =>
      (!matchedIds || matchedIds.has(bookmark.id)) &&
      requiredTags.every((tag) => bookmark.tags.includes(tag)) &&
      (!filters.favorites || bookmark.favorite) &&
      (!filters.untagged || !bookmark.processed) &&
      (!filters.broken || isBrokenStatus(bookmark.httpStatus)),
  );

  return sortBookmarks(filtered, filters.sort);
}

export function countTags(
  bookmarks: BookmarkView[],
): { count: number; tag: string }[] {
  const counts = new Map<string, number>();

  for (const bookmark of bookmarks) {
    for (const tag of bookmark.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  // Alphabetical: this feeds the Tags menu and the editor's tag picker,
  // where people scan by name, not popularity.
  return [...counts]
    .map(([tag, count]) => ({ count, tag }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

export function filtersFromParams(params: URLSearchParams): Filters {
  const sort = params.get("sort");

  return {
    broken: params.get("broken") === "1",
    favorites: params.get("favorites") === "1",
    query: params.get("q") ?? "",
    sort: sort === "oldest" || sort === "title" ? sort : "newest",
    tags: (params.get("tags") ?? "").split(",").filter(Boolean),
    untagged: params.get("untagged") === "1",
  };
}

export function filtersToParams(filters: Filters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.query) params.set("q", filters.query);
  if (filters.tags.length > 0) params.set("tags", filters.tags.join(","));
  if (filters.sort !== "newest") params.set("sort", filters.sort);
  if (filters.favorites) params.set("favorites", "1");
  if (filters.untagged) params.set("untagged", "1");
  if (filters.broken) params.set("broken", "1");

  return params;
}
