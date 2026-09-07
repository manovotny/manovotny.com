import { error } from "@sveltejs/kit";
import { buildClerkProps } from "svelte-clerk/server";
import type { LayoutServerLoad } from "./$types";

import { env } from "$env/dynamic/private";
import { isOwner } from "$lib/bookmarks/auth";

export const load: LayoutServerLoad = ({ locals }) => {
  const auth = locals.auth();
  const signedIn = Boolean(auth.userId);

  // Any signed-in user who isn't the owner sees nothing exists here.
  if (signedIn && !isOwner(auth.userId, env.BOOKMARKS_OWNER_USER_ID)) {
    error(404, "Not found");
  }

  return { ...buildClerkProps(auth), signedIn };
};
