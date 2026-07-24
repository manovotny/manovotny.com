import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  assetsInclude: ["**/*.ttf"],
  plugins: [tailwindcss(), sveltekit()],
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
