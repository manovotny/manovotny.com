import { promises as fs } from "node:fs";
import path from "node:path";
import { MetadataRoute } from "next";

async function getPages(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  });
  return entries
    .filter((entry) => entry.isFile() && entry.name === "page.mdx")
    .map((entry) =>
      entry.parentPath.replace(dir, "").replace(/\/\([^\/]*\)/g, ""),
    );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appDirectory = path.join(process.cwd(), "app");
  const pages = await getPages(appDirectory);

  const routes = pages.map((page) => ({
    url: `https://manovotny.com${page}`,
    lastModified: new Date().toISOString(),
  }));
  const sitemap = [...routes];

  return sitemap;
}
