import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

import { listUntagged } from "$lib/bookmarks/db/queries";
import { parseLimit, requireServiceToken } from "$lib/bookmarks/service";

export const prerender = false;

export const GET: RequestHandler = async ({ request, url }) => {
  requireServiceToken(request, "service");

  const rows = await listUntagged(parseLimit(url.searchParams.get("limit")));

  return json(
    rows.map(({ description, id, title, url: bookmarkUrl }) => ({
      description,
      id,
      title,
      url: bookmarkUrl,
    })),
  );
};
