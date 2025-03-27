import { promises as fs } from "node:fs";
import path from "node:path";
import { MetadataRoute } from "next";

async function getNoteSlugs(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  });
  return entries
    .filter((entry) => entry.isFile() && entry.name === "page.mdx")
    .map((entry) => {
      const relativePath = path.relative(
        dir,
        path.join(entry.parentPath, entry.name),
      );
      return path.dirname(relativePath).replace(/\\/g, "/");
    });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notesDirectory = path.join(process.cwd(), "app", "(notes)");
  const slugs = await getNoteSlugs(notesDirectory);
  const notes = slugs.map((slug) => ({
    url: `https://manovonty.com/${slug}`,
    lastModified: new Date().toISOString(),
  }));
  const routes = [""].map((route) => ({
    url: `https://manovotny.com${route}`,
    lastModified: new Date().toISOString(),
  }));
  const sitemap = [...routes, ...notes];

  return sitemap;
}
