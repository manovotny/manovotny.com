import type { RequestHandler } from "./$types";

import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";
import { listStaleLinks, recordLinkCheck } from "$lib/bookmarks/db/queries";
import { checkLink } from "$lib/bookmarks/link-check";

const BATCH_SIZE = 100;
const CONCURRENCY = 10;

export const prerender = false;

// 100 URLs × up to 20s (HEAD + GET) ÷ 10 concurrent ≈ 200s worst case.
export const config = { maxDuration: 300 };

export const GET: RequestHandler = async ({ request }) => {
  try {
    const authHeader = request.headers.get("authorization");

    // Fail closed: no configured secret means no cron, not "any caller".
    if (
      !dev &&
      (!env.CRON_SECRET || authHeader !== `Bearer ${env.CRON_SECRET}`)
    ) {
      return new Response("Unauthorized", { status: 401 });
    }

    const rows = await listStaleLinks(BATCH_SIZE);
    let checked = 0;
    let failed = 0;

    for (let start = 0; start < rows.length; start += CONCURRENCY) {
      await Promise.all(
        rows.slice(start, start + CONCURRENCY).map(async (row) => {
          try {
            await recordLinkCheck(row.id, await checkLink(row.url));
            checked += 1;
          } catch (caught) {
            // One bad row never stops the batch.
            failed += 1;
            console.error("check-links: row failed", row.id, caught);
          }
        }),
      );
    }

    console.info(`check-links: checked ${checked}, failed ${failed}`);

    return new Response("Ok", { status: 200 });
  } catch (error) {
    console.error("check-links cron error", error);

    return new Response("Internal server error", { status: 500 });
  }
};
