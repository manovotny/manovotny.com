import type { MetadataRoute } from "next";

import { baseUrl } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    host: baseUrl,
    rules: {
      disallow: "/api/",
      userAgent: "*",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
