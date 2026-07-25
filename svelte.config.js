import { fileURLToPath } from "node:url";

import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { escapeSvelte, mdsvex } from "mdsvex";
import rehypeUnwrapImages from "rehype-unwrap-images";
import { highlight } from "sugar-high";

// mdsvex hardcodes an internal remark-external-links pass (`rel: ["nofollow"]`,
// not configurable via mdsvex's own options) that stamps every external
// markdown link with `rel="nofollow"`. That prop flows through to
// src/lib/components/link.svelte as part of `...rest`, which is spread after
// the component's own `rel` attribute — so it silently overrides the
// component's correct "noopener noreferrer nofollow" (+ "sponsored") value
// down to just "nofollow". This remark plugin runs after mdsvex's internal
// pass and strips that forced `rel` so the Link component's own logic wins,
// matching production (which has no such forced injection).
function stripMdsvexForcedLinkRel() {
  return (tree) => {
    const visit = (node) => {
      if (node.type === "link" && node.data?.hProperties?.rel) {
        delete node.data.hProperties.rel;
      }
      if (Array.isArray(node.children)) {
        node.children.forEach(visit);
      }
    };

    visit(tree);
  };
}

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
    prerender: {
      handleHttpError: ({ message, path }) => {
        // Vercel's image optimization endpoint is served at runtime by the
        // platform, not by this app, so the prerender crawler can't resolve
        // it locally. Safe to ignore during build.
        if (path.startsWith("/_vercel/image")) return;

        // This path is rewritten by Vercel to an external blob storage URL
        // (see next.config.ts's rewrites()); the rewrite is ported to
        // vercel.json in Task 12, so locally the crawler can't resolve it yet.
        if (
          path ===
          "/test-and-troubleshoot-wordpress-plugins-and-themes/presentation.pdf"
        )
          return;

        throw new Error(message);
      },
    },
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
      remarkPlugins: [stripMdsvexForcedLinkRel],
      smartypants: false,
    }),
    vitePreprocess(),
  ],
};

export default config;
