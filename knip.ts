import type { KnipConfig } from "knip";

// Knip's built-in Svelte compiler only keeps `import` statements, so it misses
// the `export { default as a } from "./a.svelte"` re-exports that mdsvex's
// layout relies on, and it doesn't read mdsvex `.md` pages at all. Handing knip
// every <script> body covers both.
//
// The tradeoff: this replaces the built-in compiler, so dynamic imports in
// template expressions and style preprocessor imports go undetected. Nothing
// here uses either. Knip doesn't export its helpers to compose with.
const scripts = (text: string) =>
  [...text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)]
    .map(([, body]) => body)
    .join(";\n");

const config: KnipConfig = {
  compilers: {
    md: scripts,
    svelte: scripts,
  },
  // The plugin loads src/db/config.ts (passed to drizzle-kit with --config),
  // which throws without DATABASE_URL (which CI doesn't have). Knip still
  // treats it as an entry from those script arguments.
  drizzle: false,
  // SvelteKit loads this by convention.
  entry: ["src/env.ts"],
  // macOS's built-in Shortcuts CLI, used to sign the generated shortcut.
  ignoreBinaries: ["shortcuts"],
  // Only mdsvex pages are code; the rest of the markdown is docs.
  project: ["**/*.{css,js,ts,svelte}", "src/**/*.md"],
};

export default config;
