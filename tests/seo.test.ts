import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import { glob } from "node:fs/promises";
import { describe, it } from "node:test";

// Patterns that indicate proper canonical URL setup
const CANONICAL_PATTERNS = [
  /import\s*{\s*createMetadata\s*}\s*from\s*["']@\/lib\/metadata["']/,
  /export\s+const\s+metadata\s*=\s*createMetadata\s*\(/,
] as const;

// Pages with intentionally short titles (e.g., "Uses")
const SKIP_TITLE_CHECKS = ["app/uses/page.mdx"];

describe("seo", async () => {
  for await (const page of await glob("app/**/page.mdx", {
    exclude: ["app/page.mdx"],
  })) {
    const contents = await fs.readFile(page, { encoding: "utf8" });

    it(`${page}: should use createMetadata for canonical URLs`, () => {
      const hasAllPatterns = CANONICAL_PATTERNS.every((pattern) =>
        pattern.test(contents),
      );
      assert.ok(
        hasAllPatterns,
        "Page must import createMetadata from @/lib/metadata and use it: export const metadata = createMetadata(data)",
      );
    });

    const titleMatch = contents.match(/title:\s*["']([^"']+)["']/);
    const descriptionMatch = contents.match(
      /description:[\s\S]*?["']([^"']+)["']/,
    );

    if (titleMatch && !SKIP_TITLE_CHECKS.includes(page)) {
      const title = titleMatch[1];
      it(`${page}: should have a title between 30-60 characters`, () => {
        assert.ok(
          title.length >= 30 && title.length <= 60,
          `Title length (${title.length}) is not between 30-60 characters.`,
        );
      });
    }

    if (descriptionMatch) {
      const description = descriptionMatch[1];
      it(`${page}: should have description between 70-155 characters`, () => {
        assert.ok(
          description.length >= 70 && description.length <= 155,
          `Description length (${description.length}) is not between 70-155 characters.`,
        );
      });
    }
  }
});
