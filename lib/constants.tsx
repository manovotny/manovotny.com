import { Link } from "@/components/link";

export const baseUrl =
  `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` ||
  "http://localhost:3000";
export const siteName = "Michael Novotny";
export const siteDescription =
  "Software developer, stock trader, coffee connoisseur. Currently leading Content at Vercel.";
export const siteDescriptionCode = (
  <>
    software developer, stock investor/trader, coffee connoisseur. Currently
    leading content at <Link href="https://vercel.com/home">Vercel</Link>.
  </>
);
export const siteDomain = "manovotny.com";
export const username = "manovotny";
