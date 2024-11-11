import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
} satisfies Config;
