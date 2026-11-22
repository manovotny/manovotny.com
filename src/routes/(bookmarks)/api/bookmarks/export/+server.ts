import type { RequestHandler } from "./$types";

import { listBookmarks } from "#lib/bookmarks/queries.ts";
import { requireServiceToken } from "#lib/bookmarks/service.ts";

export const prerender = false;

export const GET: RequestHandler = async ({ request }) => {
  requireServiceToken(request, "service");

  return Response.json(await listBookmarks(), {
    headers: {
      "content-disposition": 'attachment; filename="bookmarks.json"',
    },
  });
};
