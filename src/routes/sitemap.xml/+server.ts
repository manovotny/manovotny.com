import { getLastModifiedDate } from "git-jiggy";

import { isBookmarksRouteFile } from "$lib/bookmarks/paths";
import { baseUrl } from "$lib/constants";

export const prerender = true;

const pages = Object.keys(
  import.meta.glob("/src/routes/**/+page.{md,svelte}"),
).filter((page) => !isBookmarksRouteFile(page));

export const GET = async () => {
  const entries = await Promise.all(
    pages.map(async (page) => {
      // git-jiggy returns undefined when `git log` has no history for the
      // file (e.g. it's untracked/uncommitted). Fall back to now so the
      // route stays type-safe and still emits a sane, monotonic lastmod.
      const lastModified =
        (await getLastModifiedDate(page.slice(1))) ?? new Date().toISOString();
      // "/src/routes/(notes)/flash/+page.md" -> "/flash"
      const path = page
        .replace("/src/routes", "")
        .replace(/\/\([^/]*\)/g, "")
        .replace(/\/\+page\.(md|svelte)/, "");

      return `<url>
<loc>${baseUrl}${path}</loc>
<lastmod>${new Date(lastModified).toISOString()}</lastmod>
</url>`;
    }),
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "content-type": "application/xml" },
  });
};
