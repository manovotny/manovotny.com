import { promises as fs } from "node:fs";
import path from "node:path";
import { MetadataRoute } from "next";

async function getRoutes(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  });
  return entries
    .filter((entry) => entry.isFile() && entry.name === "page.mdx")
    .map((entry) => ({
      // Replace the parent directory and remove group routes
      url: `https://manovotny.com${entry.parentPath.replace(dir, "").replace(/\/\([^\/]*\)/g, "")}`,
      lastModified: new Date().toISOString(),
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appDirectory = path.join(process.cwd(), "app");
  const routes = await getRoutes(appDirectory);
  const sitemap = [...routes];

  return sitemap;
}
