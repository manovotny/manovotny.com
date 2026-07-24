import { fileURLToPath } from "node:url";

import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { escapeSvelte, mdsvex } from "mdsvex";
import rehypeUnwrapImages from "rehype-unwrap-images";
import { highlight } from "sugar-high";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  kit: {
    adapter: adapter({
      images: {
        domains: ["ty3rozserpuox2as.public.blob.vercel-storage.com"],
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 86400,
        sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      },
    }),
  },
  preprocess: [
    mdsvex({
      extensions: [".md"],
      highlight: {
        highlighter: (code) =>
          `<pre><code>${escapeSvelte(highlight(code))}</code></pre>`,
      },
      layout: fileURLToPath(
        new URL("./src/lib/markdown/layout.svelte", import.meta.url),
      ),
      rehypePlugins: [rehypeUnwrapImages],
    }),
    vitePreprocess(),
  ],
};

export default config;
