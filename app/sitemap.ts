import { getLastModifiedDate } from "git-jiggy";
import { globby } from "globby";
import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap = [];
  const pages = await globby(["app/**/page.mdx"]);

  for (const page of pages) {
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
