export const baseUrl =
  process.env.VERCEL_ENV === "production"
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_ENV === "preview"
      ? `https://${process.env.VERCEL_BRANCH_URL}`
      : // AI harnesses pick a free port and pass it as `PORT` (see
        // scripts/ai/run.sh), which the dev server binds to with
        // `--strictPort`. Reading it back keeps canonical/og:image/sitemap URLs
        // pointed at the port actually being served. `||` rather than `??` so
        // an empty `PORT` falls back too, matching the `[ -n "$PORT" ]` test in
        // run.sh — `??` would keep `""` and emit `http://localhost:/notes`.
        `http://localhost:${process.env.PORT || 5173}`;
export const siteName = "Michael Novotny";
export const siteDescription =
  "Software developer, stock investor/trader, coffee enthusiast. Currently working on docs at Clerk.";
export const siteDomain = "manovotny.com";
export const username = "manovotny";
