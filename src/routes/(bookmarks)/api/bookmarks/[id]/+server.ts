import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

import { updateBookmark } from "$lib/bookmarks/db/queries";
import { isUuid, requireServiceToken } from "$lib/bookmarks/service";
import { invalidTags, normalizeTags } from "$lib/bookmarks/tags";
import { isPublicHttpUrl } from "$lib/bookmarks/url";
import type { BookmarkPatch } from "$lib/bookmarks/db/queries";

export const prerender = false;

function optionalString(
  body: Record<string, unknown>,
  key: string,
): string | null | undefined {
  if (!(key in body)) {
    return undefined;
  }

  const value = body[key];

  if (value === null) {
    return null;
  }

  if (typeof value !== "string") {
    error(422, `${key} must be a string`);
  }

  return value.trim() || null;
}

export const PATCH: RequestHandler = async ({ params, request }) => {
  requireServiceToken(request, "service");

  if (!isUuid(params.id)) {
    error(404, "Not found");
  }

  const body: unknown = await request.json().catch(() => null);

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    error(400, "Expected a JSON object");
  }

  const fields = body as Record<string, unknown>;
  const patch: BookmarkPatch = {};

  const description = optionalString(fields, "description");
  if (description !== undefined) patch.description = description;

  const image = optionalString(fields, "image");
  if (image !== undefined) {
    if (image !== null && !isPublicHttpUrl(image)) {
      error(422, "image must be a public http(s) URL");
    }

    patch.image = image;
  }

  const title = optionalString(fields, "title");
  if (title !== undefined) patch.title = title;

  if ("tags" in fields) {
    const raw = fields.tags;

    if (!Array.isArray(raw) || !raw.every((tag) => typeof tag === "string")) {
      error(422, "tags must be an array of strings");
    }

    const invalid = invalidTags(raw);

    if (invalid.length > 0) {
      return json({ invalid, message: "Invalid tags" }, { status: 422 });
    }

    patch.tags = normalizeTags(raw);
  }

  if ("processed" in fields) {
    if (fields.processed !== true) {
      error(422, "processed may only be true");
    }

    patch.processed = true;
  }

  if (Object.keys(patch).length === 0) {
    error(422, "Nothing to update");
  }

  const bookmark = await updateBookmark(params.id, patch);

  if (!bookmark) {
    error(404, "Not found");
  }

  return json({ bookmark });
};
