import type { VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  // The Vercel project's framework preset predates this repo's SvelteKit
  // conversion; override per-deployment so main (still Next.js) is unaffected.
  framework: "sveltekit-1",
  redirects: [
    {
      destination: "/",
      permanent: true,
      source: "/phpstorm-keyboard-shortcuts",
    },
    {
      destination: "/",
      permanent: true,
      source: "/setup-phpstorm-xdebug-mamp-debugging",
    },
    { destination: "/", permanent: true, source: "/accounts-and-services" },
    { destination: "/", permanent: true, source: "/blogging-advice" },
    { destination: "/", permanent: true, source: "/macbook-air-vs-retina" },
    { destination: "/", permanent: true, source: "/pagely" },
    {
      destination: "/test-and-troubleshoot-wordpress",
      permanent: true,
      source: "/speaking-at-wordcamp-atlanta",
    },
    { destination: "/", permanent: true, source: "/start-a-blog" },
    { destination: "/", permanent: true, source: "/wordpress" },
    { destination: "/", permanent: true, source: "/wordpress-plugins" },
    { destination: "/", permanent: true, source: "/wp-engine" },
    {
      destination:
        "/test-and-troubleshoot-wordpress-plugins-and-themes/presentation.pdf",
      permanent: true,
      source:
        "/wp-content/uploads/2013/03/How-To-Test-Troubleshoot-WordPress-Plugins-Themes.pdf",
    },
    { destination: "/", permanent: true, source: "/wp-content/:path*" },
  ],
  rewrites: [
    {
      // Vercel's server-side vercel.ts parser evaluates statically — the
      // destination must be a literal string, not a template with variables.
      destination:
        "https://ty3rozserpuox2as.public.blob.vercel-storage.com/test-and-troubleshoot-wordpress-plugins-and-themes/wordcamp-atlanta-2013-slides.pdf",
      source:
        "/test-and-troubleshoot-wordpress-plugins-and-themes/presentation.pdf",
    },
  ],
  trailingSlash: false,
};
