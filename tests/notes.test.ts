import { getNotes } from "../src/lib/notes";
import { describe, expect, it } from "vitest";

describe("getNotes", () => {
  // Regression: the (notes) route group contains literal parentheses, which
  // Vite's glob matcher treats as pattern syntax unless escaped — an
  // unescaped pattern silently matches nothing and drops every local note.
  it("includes local notes from the (notes) route group", () => {
    const localNotes = getNotes().filter((note) => note.href.startsWith("/"));

    expect(localNotes.length).toBeGreaterThan(0);
  });

  it("sorts notes newest first", () => {
    const dates = getNotes().map((note) => new Date(note.date).getTime());

    expect(dates).toEqual([...dates].sort((a, b) => b - a));
  });
});
