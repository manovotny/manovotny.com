import {
  InvalidUrlError,
  isPublicHttpUrl,
  normalizeUrl,
} from "../../src/lib/bookmarks/url";
import { describe, expect, it } from "vitest";

describe("normalizeUrl", () => {
  it("lowercases the host, drops www, sorts params, strips fragment and trailing slash", () => {
    const result = normalizeUrl(
      "https://www.Example.com/Path/?utm_source=x&b=2&a=1#frag",
    );

    expect(result.normalizedUrl).toBe("https://example.com/Path?a=1&b=2");
    expect(result.url).toBe("https://www.example.com/Path/?b=2&a=1#frag");
    expect(result.domain).toBe("example.com");
  });

  it("canonicalizes twitter.com to x.com and strips X's share params", () => {
    const result = normalizeUrl(
      "https://twitter.com/foo/status/123?s=20&t=abc",
    );

    expect(result.normalizedUrl).toBe("https://x.com/foo/status/123");
    expect(result.url).toBe("https://twitter.com/foo/status/123");
    expect(result.domain).toBe("x.com");
  });

  it("keeps s/t params on non-X hosts", () => {
    expect(normalizeUrl("https://example.com/?s=1&t=2").normalizedUrl).toBe(
      "https://example.com/?s=1&t=2",
    );
  });

  it("forces https and removes default ports but keeps non-default ones", () => {
    expect(normalizeUrl("http://github.com:80/a/b/").normalizedUrl).toBe(
      "https://github.com/a/b",
    );
    expect(normalizeUrl("https://example.com:8443/x").normalizedUrl).toBe(
      "https://example.com:8443/x",
    );
  });

  it("rejects embedded credentials", () => {
    expect(() => normalizeUrl("https://user:pw@example.com/")).toThrow(
      InvalidUrlError,
    );
  });

  it("keeps the bare root slash", () => {
    expect(normalizeUrl("https://example.com").normalizedUrl).toBe(
      "https://example.com/",
    );
  });

  it("strips known tracking params from url and normalizedUrl", () => {
    const result = normalizeUrl(
      "https://medium.com/@a/b?fbclid=1&gclid=2&mc_cid=3&ref_src=4&keep=5",
    );

    expect(result.url).toBe("https://medium.com/@a/b?keep=5");
    expect(result.normalizedUrl).toBe("https://medium.com/@a/b?keep=5");
  });

  it("trims surrounding whitespace", () => {
    expect(normalizeUrl("  https://example.com/x  ").normalizedUrl).toBe(
      "https://example.com/x",
    );
  });

  it("rejects non-http(s) and garbage", () => {
    expect(() => normalizeUrl("ftp://example.com")).toThrow(InvalidUrlError);
    expect(() => normalizeUrl("not a url")).toThrow(InvalidUrlError);
    expect(() => normalizeUrl("")).toThrow(InvalidUrlError);
  });

  it("leaves the query string untouched when nothing was stripped", () => {
    expect(normalizeUrl("https://example.com/?q=a%20b&next=/foo").url).toBe(
      "https://example.com/?q=a%20b&next=/foo",
    );
  });
});

describe("isPublicHttpUrl", () => {
  it("accepts ordinary public hosts", () => {
    expect(isPublicHttpUrl("https://example.com/x")).toBe(true);
    expect(isPublicHttpUrl("http://93.184.216.34/")).toBe(true);
  });

  it("rejects loopback, private, link-local, and internal names", () => {
    for (const url of [
      "http://localhost/",
      "http://127.0.0.1/",
      "http://10.0.0.5/",
      "http://172.16.4.4/",
      "http://192.168.1.1/",
      "http://169.254.169.254/latest/meta-data",
      "http://[::1]/",
      "http://[fd00::1]/",
      "http://[fe90::1]/",
      "http://printer.local/",
      "http://db.internal/",
      "http://localhost./",
      "http://sub.localhost./",
      "http://metadata.google.internal./",
      "https://user:pw@example.com/",
      "ftp://example.com/",
    ]) {
      expect(isPublicHttpUrl(url), url).toBe(false);
    }
  });
});
