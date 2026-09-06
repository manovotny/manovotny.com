import { error, fail } from "@sveltejs/kit";
import { waitUntil } from "@vercel/functions";
import type { Actions, PageServerLoad } from "./$types";

import { env } from "$env/dynamic/private";
import { viewerRole } from "$lib/bookmarks/auth";
import {
  listBookmarks,
  softDeleteBookmark,
  updateBookmark,
} from "$lib/bookmarks/db/queries";
import { backfillMetadata, saveBookmark } from "$lib/bookmarks/save";
import { countTags } from "$lib/bookmarks/search";
import { isUuid, requireOwner } from "$lib/bookmarks/service";
import { invalidTags, normalizeTags } from "$lib/bookmarks/tags";
import { InvalidUrlError } from "$lib/bookmarks/url";
import { toBookmarkView } from "$lib/bookmarks/view";

export const load: PageServerLoad = async ({ locals }) => {
  const role = viewerRole(locals.auth().userId, env.BOOKMARKS_OWNER_USER_ID);

  // Anonymous: the layout renders <SignIn />; ship no data, touch no DB.
  if (role === "anonymous") {
    return { bookmarks: [], tags: [] };
  }

  if (role === "stranger") {
    error(404, "Not found");
  }

  const bookmarks = (await listBookmarks()).map(toBookmarkView);

  return { bookmarks, tags: countTags(bookmarks) };
};

// Returns null for a malformed id so the action can `fail()` inline rather
// than throw to the error page.
function formId(form: FormData): string | null {
  const id = String(form.get("id") ?? "");

  return isUuid(id) ? id : null;
}

const invalidId = () => fail(400, { message: "Invalid bookmark id." });

export const actions: Actions = {
  add: async ({ locals, request }) => {
    requireOwner(locals);

    const form = await request.formData();
    const url = String(form.get("url") ?? "");

    try {
      const { bookmark, outcome } = await saveBookmark({ url });

      if (outcome === "created") {
        waitUntil(backfillMetadata(bookmark));
      }

      return { added: outcome };
    } catch (caught) {
      if (caught instanceof InvalidUrlError) {
        return fail(400, { message: "That doesn't look like a URL.", url });
      }

      throw caught;
    }
  },

  delete: async ({ locals, request }) => {
    requireOwner(locals);

    const id = formId(await request.formData());

    if (!id) {
      return invalidId();
    }

    if (!(await softDeleteBookmark(id))) {
      return fail(404, { message: "Bookmark not found." });
    }

    return { deleted: id };
  },

  favorite: async ({ locals, request }) => {
    requireOwner(locals);

    const form = await request.formData();
    const id = formId(form);
    const value = form.get("favorite");

    if (!id) {
      return invalidId();
    }

    if (value !== "true" && value !== "false") {
      return fail(400, { message: "Invalid favorite value." });
    }

    if (!(await updateBookmark(id, { favorite: value === "true" }))) {
      return fail(404, { message: "Bookmark not found." });
    }

    return { favorited: id };
  },

  update: async ({ locals, request }) => {
    requireOwner(locals);

    const form = await request.formData();
    const id = formId(form);
    const title = String(form.get("title") ?? "").trim() || null;
    const rawTags = String(form.get("tags") ?? "").split(",");
    const invalid = invalidTags(rawTags);

    if (!id) {
      // A plain invalidId() here would return an `{ message }`-only shape,
      // which TypeScript's return-type inference then treats as a supertype
      // of this action's other `{ id, message }` failures and collapses them
      // into — silently erasing `id` from ActionData. The explicit
      // `id: undefined` keeps this failure's shape distinct so `id` survives.
      return fail(400, { id: undefined, message: "Invalid bookmark id." });
    }

    if (invalid.length > 0) {
      return fail(422, {
        id,
        message: `Invalid tags: ${invalid.join(", ")}. Use lowercase words and hyphens.`,
      });
    }

    const tags = normalizeTags(rawTags);

    // A human edit counts as processed: the routine must never overwrite it.
    if (!(await updateBookmark(id, { processed: true, tags, title }))) {
      return fail(404, { id, message: "Bookmark not found." });
    }

    return { updated: id };
  },
};
