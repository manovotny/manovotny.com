import { promises as fs } from "node:fs";
import { glob } from "node:fs/promises";

import { assert, describe, it } from "vitest";

// Pages with intentionally short titles (e.g., "Uses")
const SKIP_TITLE_CHECKS = [
  "src/routes/(notes)/flash/+page.md",
  "src/routes/(notes)/start/+page.md",
  "src/routes/uses/+page.md",
];

const pages: string[] = [];

for await (const page of glob("src/routes/**/+page.md")) {
  if (page === "src/routes/+page.md") continue; // home uses site defaults
  pages.push(page);
}

describe("seo", () => {
  for (const page of pages) {
    it(`${page}: has required frontmatter`, async () => {
      const contents = await fs.readFile(page, { encoding: "utf8" });
      const frontmatter = contents.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";

      const title = frontmatter.match(/^title:\s*"(.+)"$/m)?.[1];
      const description = frontmatter.match(/^description:\s*"(.+)"$/m)?.[1];
      const slug = frontmatter.match(/^slug:\s*"(.+)"$/m)?.[1];

      assert.ok(title, "frontmatter must include title");
      assert.ok(description, "frontmatter must include description");
      assert.ok(slug, "frontmatter must include slug");

      if (!SKIP_TITLE_CHECKS.includes(page)) {
        assert.ok(
          title.length >= 30 && title.length <= 60,
          `Title length (${title.length}) is not between 30-60 characters.`,
        );
      }

      assert.ok(
        description.length >= 70 && description.length <= 155,
        `Description length (${description.length}) is not between 70-155 characters.`,
      );
    });
  }
});
