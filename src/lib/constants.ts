export const baseUrl =
  process.env.VERCEL_ENV === "production"
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_ENV === "preview"
      ? `https://${process.env.VERCEL_BRANCH_URL}`
      : "http://localhost:5173";
export const siteName = "Michael Novotny";
export const siteDescription =
  "Software developer, stock investor/trader, coffee enthusiast. Currently working on docs at Clerk.";
export const siteDomain = "manovotny.com";
export const username = "manovotny";
