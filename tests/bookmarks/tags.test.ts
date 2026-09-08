import {
  invalidTags,
  isValidTag,
  normalizeTags,
  parseTagInput,
} from "../../src/lib/bookmarks/tags";
import { describe, expect, it } from "vitest";

describe("isValidTag", () => {
  it("accepts lowercase kebab-case", () => {
    expect(isValidTag("css")).toBe(true);
    expect(isValidTag("best-practices")).toBe(true);
    expect(isValidTag("3d")).toBe(true);
  });

  it("rejects uppercase, spaces, leading/trailing hyphens, empties", () => {
    expect(isValidTag("CSS")).toBe(false);
    expect(isValidTag("best practices")).toBe(false);
    expect(isValidTag("-css")).toBe(false);
    expect(isValidTag("css-")).toBe(false);
    expect(isValidTag("")).toBe(false);
  });
});

describe("normalizeTags", () => {
  it("trims, lowercases, hyphenates whitespace, dedupes, sorts", () => {
    expect(normalizeTags([" React ", "css", "Best Practices", "css"])).toEqual([
      "best-practices",
      "css",
      "react",
    ]);
  });

  it("drops empty strings but keeps invalid ones for reporting", () => {
    expect(normalizeTags(["", "  ", "c++"])).toEqual(["c++"]);
  });
});

describe("invalidTags", () => {
  it("returns the normalized tags that fail validation", () => {
    expect(invalidTags(["css", "c++", "Node.js"])).toEqual(["c++", "node.js"]);
  });
});

describe("parseTagInput", () => {
  it("splits on commas and drops invalid entries", () => {
    expect(parseTagInput("css, React,, c++ ,best practices")).toEqual([
      "best-practices",
      "css",
      "react",
    ]);
  });
});
