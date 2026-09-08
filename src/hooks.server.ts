import { sequence } from "@sveltejs/kit/hooks";
import { withClerkHandler } from "svelte-clerk/server";
import type { Handle } from "@sveltejs/kit";

import { isBookmarksPagePath, isBookmarksPath } from "$lib/bookmarks/paths";

// /bookmarks and /api/bookmarks are private: keep crawlers out via header so
// no per-page meta tags are needed, and forbid shared caches. Responses like
// redirects have immutable headers, so clone instead of mutating.
const privateBookmarks: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  if (!isBookmarksPath(event.url.pathname)) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("cache-control", "private, no-store");
  headers.set("x-robots-tag", "noindex, nofollow");

  return new Response(response.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
  });
};

// Clerk only runs for the bookmarks pages. Blog/notes/uses never see it, and
// the token-protected /api/bookmarks endpoints never hand Clerk a non-Clerk
// bearer token. `locals.auth` is therefore only defined under /bookmarks.
const clerk = withClerkHandler();
const clerkForBookmarks: Handle = ({ event, resolve }) =>
  isBookmarksPagePath(event.url.pathname)
    ? clerk({ event, resolve })
    : resolve(event);

export const handle = sequence(privateBookmarks, clerkForBookmarks);
