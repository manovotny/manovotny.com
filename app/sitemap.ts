import { promises as fs } from "node:fs";
import path from "node:path";
import { MetadataRoute } from "next";
import { getLastModifiedDate } from "git-jiggy";

async function getRoutes(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  });
  const routes = [];

  for (const entry of entries) {
    if (entry.isFile() && entry.name === "page.mdx") {
      const lastModified = await getLastModifiedDate(
        `${entry.parentPath}/${entry.name}`,
      );

      routes.push({
        // Replace the parent directory and remove group routes
        url: `https://manovotny.com${entry.parentPath.replace(dir, "").replace(/\/\([^\/]*\)/g, "")}`,
        lastModified,
      });
    }
  }

  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appDirectory = path.join(process.cwd(), "app");
  const routes = await getRoutes(appDirectory);
  const sitemap = [...routes];

  return sitemap;
}
