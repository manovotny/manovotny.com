import { Link } from "@/components/link";

export const baseUrl =
  process.env.VERCEL_ENV === "production"
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_ENV === "preview"
      ? `https://${process.env.VERCEL_BRANCH_URL}`
      : "http://localhost:3000";
export const siteName = "Michael Novotny";
export const siteDescription =
  "Software developer, stock investor/trader, coffee enthusiast. Currently working on docs at Clerk.";
export const siteDescriptionCode = (
  <>
    software developer, stock investor/trader, coffee enthusiast. Currently
    working on docs at <Link href="https://clerk.com">Clerk</Link>.
  </>
);
export const siteDomain = "manovotny.com";
export const username = "manovotny";
