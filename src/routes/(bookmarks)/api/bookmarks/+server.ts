import { error, json } from "@sveltejs/kit";
import { waitUntil } from "@vercel/functions";
import type { RequestHandler } from "./$types";

import { backfillMetadata, saveBookmark } from "$lib/bookmarks/save";
import { requireServiceToken } from "$lib/bookmarks/service";
import { InvalidUrlError } from "$lib/bookmarks/url";

export const prerender = false;

export const POST: RequestHandler = async ({ request }) => {
  requireServiceToken(request, "capture");

  const body: unknown = await request.json().catch(() => null);
  const url =
    body && typeof body === "object" && "url" in body ? body.url : undefined;
  const title =
    body && typeof body === "object" && "title" in body
      ? body.title
      : undefined;

  if (typeof url !== "string" || !url.trim()) {
    error(400, "Missing url");
  }

  try {
    const { bookmark, outcome } = await saveBookmark({
      title: typeof title === "string" ? title : undefined,
      url,
    });

    if (outcome === "created") {
      // The fetch starts here but is never awaited; waitUntil keeps it alive
      // after the response is sent. Capture latency never includes it.
      waitUntil(backfillMetadata(bookmark));
    }

    // Outcome only: the capture token lives on a phone and must not be able
    // to read back an existing record by resubmitting its URL.
    return json(
      {
        duplicate: outcome === "duplicate",
        restored: outcome === "restored",
      },
      { status: outcome === "created" ? 201 : 200 },
    );
  } catch (caught) {
    if (caught instanceof InvalidUrlError) {
      error(400, caught.message);
    }

    throw caught;
  }
};
