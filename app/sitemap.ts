import { glob } from "node:fs/promises";
import { getLastModifiedDate } from "git-jiggy";
import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap = [];

  for await (const page of glob("app/**/page.mdx")) {
    const lastModified = await getLastModifiedDate(page);
    // Remove the `app` directory, remove group routes, and remove `page.mdx`
    const path = page
      .replace("app", "")
      .replace(/\/\([^/]*\)/g, "")
      .replace("/page.mdx", "");

    sitemap.push({
      lastModified,
      url: `${baseUrl}${path}`,
    });
  }

  console.log("sitemap", sitemap);

  return sitemap;
}
