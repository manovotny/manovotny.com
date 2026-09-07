import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

import { listBookmarks } from "$lib/bookmarks/db/queries";
import { requireServiceToken } from "$lib/bookmarks/service";

export const prerender = false;

export const GET: RequestHandler = async ({ request }) => {
  requireServiceToken(request, "service");

  return json(await listBookmarks(), {
    headers: {
      "content-disposition": 'attachment; filename="bookmarks.json"',
    },
  });
};
