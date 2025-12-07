import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import { glob } from "node:fs/promises";
import { describe, it } from "node:test";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

describe("SEO", async () => {
  for await (const page of await glob("app/**/page.mdx", {
    exclude: ["app/page.mdx", "app/uses/page.mdx"],
  })) {
    const baseUrl = `file://${process.cwd()}`;
    const contents = await fs.readFile(page, { encoding: "utf8" });
    const replaced = contents.replaceAll("@/", `${baseUrl}/`);
    const { metadata } = await evaluate(replaced, {
      ...runtime,
      baseUrl,
    });

    it(`${page}: should have a title between 30-60 characters`, async () => {
      assert.ok(
        metadata.title.length >= 30 && metadata.title.length <= 60,
        `Title length (${metadata.title.length}) is not between 30-60 characters.`,
      );
    });

    it(`${page}: should have description between 70-155 characters`, () => {
      assert.ok(
        metadata.description.length >= 70 && metadata.description.length <= 155,
        `Description length (${metadata.description.length}) is not between 70-155 characters.`,
      );
    });
  }
});
