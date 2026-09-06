import { parseCsv, parseCsvRecords } from "../../src/lib/bookmarks/csv";
import { describe, expect, it } from "vitest";

describe("parseCsv", () => {
  it("splits simple rows and trims a trailing newline", () => {
    expect(parseCsv("a,b,c\n1,2,3\n")).toEqual([
      ["a", "b", "c"],
      ["1", "2", "3"],
    ]);
  });

  it("handles quoted commas, escaped quotes, and embedded newlines", () => {
    const text = `title,tags\n"Hello, world","a, b"\n"She said ""hi""","x"\n"multi\nline","y"\n`;

    expect(parseCsv(text)).toEqual([
      ["title", "tags"],
      ["Hello, world", "a, b"],
      ['She said "hi"', "x"],
      ["multi\nline", "y"],
    ]);
  });

  it("handles CRLF and empty fields", () => {
    expect(parseCsv("a,b\r\n,\r\n1,\r\n")).toEqual([
      ["a", "b"],
      ["", ""],
      ["1", ""],
    ]);
  });
});

describe("parseCsvRecords", () => {
  it("keys rows by the header", () => {
    expect(parseCsvRecords("url,tags\nhttps://a,x\n")).toEqual([
      { tags: "x", url: "https://a" },
    ]);
  });
});
