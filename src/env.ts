import { defineEnvVars } from "@sveltejs/kit/env";
import { clerkEnvVars } from "svelte-clerk/env";

// Matches the old `$env/dynamic/private` behavior: unset variables are
// `undefined` rather than failing startup, and callers handle the absence.
const optional = (input: string | undefined) => input;

export const variables = defineEnvVars({
  ...clerkEnvVars(),
  BOOKMARKS_API_TOKEN: { schema: optional },
  BOOKMARKS_CAPTURE_TOKEN: { schema: optional },
  BOOKMARKS_OWNER_USER_ID: { schema: optional },
  CRON_SECRET: { schema: optional },
  DATABASE_URL: { schema: optional },
});
