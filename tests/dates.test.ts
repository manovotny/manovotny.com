import { formatNoteDate } from "../src/lib/dates";
import { describe, expect, it } from "vitest";

describe("formatNoteDate", () => {
  it("formats full dates by default", () => {
    expect(formatNoteDate("2013-03-19")).toBe("Mar 19, 2013");
  });

  it("formats month-year", () => {
    expect(formatNoteDate("2024-09-04", "month-year")).toBe("Sep 2024");
  });

  it("is not shifted by UTC parsing", () => {
    expect(formatNoteDate("2022-12-08")).toBe("Dec 8, 2022");
  });
});
