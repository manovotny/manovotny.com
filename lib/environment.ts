export const baseUrl =
  process.env.VERCEL_ENV === "production"
    ? "https://manovotny.com"
    : process.env.VERCEL_ENV === "preview"
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000";
