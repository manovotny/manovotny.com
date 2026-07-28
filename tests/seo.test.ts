import { promises as fs } from "node:fs";
import { glob } from "node:fs/promises";

import Seo from "../src/lib/components/seo.svelte";
import { siteDescription, siteName } from "../src/lib/constants";
import { render } from "svelte/server";
import { assert, describe, expect, it } from "vitest";

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

// Regression: several meta tags ignored their props — twitter:title and
// twitter:description rendered the site-wide constants on every page,
// twitter:image ignored the per-title OG image, and og:url, og:site_name,
// og:locale, and og:type rendered only when no title was passed.
function metaTags(props: Record<string, string>): Record<string, string> {
  const { head } = render(Seo, { props });
  const tags: Record<string, string> = {};

  for (const tag of head.match(/<meta[^>]*>/g) ?? []) {
    const key = tag.match(/(?:property|name)="([^"]+)"/)?.[1];
    const content = tag.match(/content="([^"]*)"/)?.[1];

    if (key && content !== undefined) tags[key] = content;
  }

  return tags;
}

const note = {
  date: "2013-01-02",
  description: "Six years of professional Flash development ended.",
  slug: "flash",
  title: "Breaking up with Flash",
};

describe("Seo", () => {
  it("gives a note its own twitter card text", () => {
    const tags = metaTags(note);

    expect(tags["twitter:title"]).toBe(`${note.title} • ${siteName}`);
    expect(tags["twitter:description"]).toBe(note.description);
  });

  it("points twitter:image at the per-title og image", () => {
    expect(metaTags(note)["twitter:image"]).toContain(
      `/api/og-image?title=${encodeURIComponent(note.title)}`,
    );
  });

  it("falls back to the site defaults on the homepage", () => {
    const tags = metaTags({});

    expect(tags["twitter:title"]).toBe(siteName);
    expect(tags["twitter:description"]).toBe(siteDescription);
    expect(tags["og:image"]).toMatch(/\/api\/og-image$/);
  });

  it("emits og:url, og:site_name, and og:locale on every page", () => {
    const variants: Record<string, string>[] = [
      note,
      {},
      { slug: "notes", title: "Notes" },
    ];

    for (const props of variants) {
      const tags = metaTags(props);

      expect(tags["og:url"]).toBeDefined();
      expect(tags["og:site_name"]).toBe(siteName);
      expect(tags["og:locale"]).toBe("en_US");
    }
  });

  it("types dated pages as articles and everything else as websites", () => {
    expect(metaTags(note)["og:type"]).toBe("article");
    expect(metaTags({})["og:type"]).toBe("website");
    // Listings carry a title but no date, so they must not read as articles.
    expect(metaTags({ slug: "notes", title: "Notes" })["og:type"]).toBe(
      "website",
    );
    expect(metaTags({ slug: "uses", title: "Uses" })["og:type"]).toBe(
      "website",
    );
  });
});
