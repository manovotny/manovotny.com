import { formatDate } from "../src/lib/dates";
import { describe, expect, it } from "vitest";

describe("formatDate", () => {
  it("formats full dates by default", () => {
    expect(formatDate("2013-03-19")).toBe("Mar 19, 2013");
  });

  it("formats month-year", () => {
    expect(formatDate("2024-09-04", "month-year")).toBe("Sep 2024");
  });

  it("is not shifted by UTC parsing", () => {
    expect(formatDate("2022-12-08")).toBe("Dec 8, 2022");
  });
});
