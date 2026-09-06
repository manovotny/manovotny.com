import { fetchMetadata, parseMetadata } from "../../src/lib/bookmarks/metadata";
import { describe, expect, it, vi } from "vitest";

const html = `
<html><head>
<title>Fallback &amp; Title</title>
<meta property="og:title" content="OG Title" />
<meta content="A description with &quot;quotes&quot;" name="description">
<meta property="og:image" content="/images/cover.png">
</head><body></body></html>`;

describe("parseMetadata", () => {
  it("prefers og:title over <title> and decodes entities", () => {
    expect(parseMetadata(html, "https://example.com/post").title).toBe(
      "OG Title",
    );
    expect(
      parseMetadata("<title>Only &amp; Title</title>", "https://e.com").title,
    ).toBe("Only & Title");
  });

  it("reads description regardless of attribute order", () => {
    expect(parseMetadata(html, "https://example.com/post").description).toBe(
      'A description with "quotes"',
    );
  });

  it("resolves relative og:image against the page URL", () => {
    expect(parseMetadata(html, "https://example.com/post").image).toBe(
      "https://example.com/images/cover.png",
    );
  });

  it("falls back to twitter:image and og:description", () => {
    const alt = `<meta property="og:description" content="OG desc"><meta name="twitter:image" content="https://cdn.example.com/t.jpg">`;

    expect(parseMetadata(alt, "https://example.com")).toEqual({
      description: "OG desc",
      image: "https://cdn.example.com/t.jpg",
    });
  });

  it("returns an empty object for HTML without metadata", () => {
    expect(parseMetadata("<html></html>", "https://example.com")).toEqual({});
  });
});

describe("fetchMetadata", () => {
  it("parses an HTML response", async () => {
    const fetcher = (async () =>
      new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      })) as unknown as typeof fetch;

    expect(await fetchMetadata("https://example.com/post", fetcher)).toEqual({
      description: 'A description with "quotes"',
      image: "https://example.com/images/cover.png",
      title: "OG Title",
    });
  });

  it("returns {} for non-HTML, non-OK, or throwing fetches", async () => {
    const json = (async () =>
      new Response("{}", {
        headers: { "content-type": "application/json" },
      })) as unknown as typeof fetch;
    const notOk = (async () =>
      new Response("", { status: 403 })) as unknown as typeof fetch;
    const throws = (async () => {
      throw new Error("boom");
    }) as unknown as typeof fetch;

    expect(await fetchMetadata("https://example.com", json)).toEqual({});
    expect(await fetchMetadata("https://example.com", notOk)).toEqual({});
    expect(await fetchMetadata("https://example.com", throws)).toEqual({});
  });

  it("never fetches non-public hosts", async () => {
    const fetcher = vi.fn();

    expect(
      await fetchMetadata(
        "http://169.254.169.254/",
        fetcher as unknown as typeof fetch,
      ),
    ).toEqual({});
    expect(fetcher).not.toHaveBeenCalled();
  });
});
