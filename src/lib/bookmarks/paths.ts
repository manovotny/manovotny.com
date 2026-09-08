function matchesPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

// Pages the human visits. Clerk runs only here.
export function isBookmarksPagePath(pathname: string): boolean {
  return matchesPrefix(pathname, "/bookmarks");
}

// Pages + token-protected API. Both get noindex headers.
export function isBookmarksPath(pathname: string): boolean {
  return (
    isBookmarksPagePath(pathname) || matchesPrefix(pathname, "/api/bookmarks")
  );
}

// import.meta.glob keys look like "/src/routes/(bookmarks)/bookmarks/+page.svelte".
export function isBookmarksRouteFile(globPath: string): boolean {
  return globPath.includes("/(bookmarks)/");
}
