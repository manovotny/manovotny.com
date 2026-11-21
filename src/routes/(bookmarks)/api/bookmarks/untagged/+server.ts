import type { RequestHandler } from "./$types";

import { listUntagged } from "#lib/bookmarks/queries.ts";
import { parseLimit, requireServiceToken } from "#lib/bookmarks/service.ts";

export const prerender = false;

export const GET: RequestHandler = async ({ request, url }) => {
  requireServiceToken(request, "service");

  const rows = await listUntagged(parseLimit(url.searchParams.get("limit")));

  return Response.json(
    rows.map(({ description, id, title, url: bookmarkUrl }) => ({
      description,
      id,
      title,
      url: bookmarkUrl,
    })),
  );
};
