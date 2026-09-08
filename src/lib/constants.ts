// The site renders without client-side JS, but /bookmarks hydrates and the
// header imports `siteName` from here, so this module runs in the browser
// too. `process` only exists on the server, and `baseUrl` is only read there.
const env: NodeJS.ProcessEnv =
  typeof process === "undefined" ? {} : process.env;

export const baseUrl =
  env.VERCEL_ENV === "production"
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : env.VERCEL_ENV === "preview"
      ? `https://${env.VERCEL_BRANCH_URL}`
      : // AI harnesses pick a free port and pass it as `PORT` (see
        // scripts/ai/run.sh), which the dev server binds to with
        // `--strictPort`. Reading it back keeps canonical/og:image/sitemap URLs
        // pointed at the port actually being served. Coerce before falling
        // back so empty, zero, and non-numeric values all land on Vite's
        // default instead of emitting `http://localhost:` or `localhost:0` —
        // builds read PORT without run.sh in the way, and `??` would keep `""`.
        // The URL is the only thing that falls back: run.sh still hands the
        // raw value to Vite, where `--strictPort` makes garbage fail loudly.
        `http://localhost:${Number(env.PORT) || 5173}`;
export const siteName = "Michael Novotny";
export const siteDescription =
  "Software developer, stock investor/trader, coffee enthusiast. Currently working on docs at Clerk.";
export const siteDomain = "manovotny.com";
export const username = "manovotny";
