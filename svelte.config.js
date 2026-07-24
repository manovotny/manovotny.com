import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte"],
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
  preprocess: vitePreprocess(),
};

export default config;
