export const baseUrl =
  process.env.VERCEL_ENV === "production"
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_ENV === "preview"
      ? `https://${process.env.VERCEL_BRANCH_URL}`
      : // AI harnesses pick a free port and pass it as `PORT` (see
        // scripts/ai/run.sh), which the dev server binds to with
        // `--strictPort`. Reading it back keeps canonical/og:image/sitemap URLs
        // pointed at the port actually being served. Coerce before falling
        // back so empty, zero, and non-numeric values all land on Vite's
        // default instead of emitting `http://localhost:` or `localhost:0`.
        // `??` wouldn't do it — it keeps `""`, which run.sh reads as absent.
        `http://localhost:${Number(process.env.PORT) || 5173}`;
export const siteName = "Michael Novotny";
export const siteDescription =
  "Software developer, stock investor/trader, coffee enthusiast. Currently working on docs at Clerk.";
export const siteDomain = "manovotny.com";
export const username = "manovotny";
