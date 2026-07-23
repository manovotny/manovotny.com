import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const blobHostname = "ty3rozserpuox2as.public.blob.vercel-storage.com";

const nextConfig: NextConfig = {
  // Disabled because it currently breaks syntax highlighting
  // experimental: { mdxRs: true },
  images: {
    remotePatterns: [
      {
        hostname: blobHostname,
        protocol: "https",
      },
    ],
  },
  pageExtensions: ["ts", "tsx", "mdx"],
  reactStrictMode: true,
  async redirects() {
    return [
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
      // Redirect removed posts that may still have inbound links
      {
        destination: "/",
        permanent: true,
        source: "/accounts-and-services",
      },
      {
        destination: "/",
        permanent: true,
        source: "/blogging-advice",
      },
      {
        destination: "/",
        permanent: true,
        source: "/macbook-air-vs-retina",
      },
      {
        destination: "/",
        permanent: true,
        source: "/pagely",
      },
      {
        destination: "/test-and-troubleshoot-wordpress",
        permanent: true,
        source: "/speaking-at-wordcamp-atlanta",
      },
      {
        destination: "/",
        permanent: true,
        source: "/start-a-blog",
      },
      {
        destination: "/",
        permanent: true,
        source: "/wordpress",
      },
      {
        destination: "/",
        permanent: true,
        source: "/wordpress-plugins",
      },
      {
        destination: "/",
        permanent: true,
        source: "/wp-engine",
      },
      // Redirect old WordPress upload paths
      {
        destination:
          "/test-and-troubleshoot-wordpress-plugins-and-themes/presentation.pdf",
        permanent: true,
        source:
          "/wp-content/uploads/2013/03/How-To-Test-Troubleshoot-WordPress-Plugins-Themes.pdf",
      },
      {
        destination: "/",
        permanent: true,
        source: "/wp-content/:path*",
      },
    ];
  },
  async rewrites() {
    return [
      {
        destination: `https://${blobHostname}/test-and-troubleshoot-wordpress-plugins-and-themes/wordcamp-atlanta-2013-slides.pdf`,
        source:
          "/test-and-troubleshoot-wordpress-plugins-and-themes/presentation.pdf",
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    rehypePlugins: ["rehype-unwrap-images"],
    remarkPlugins: ["remark-sugar-high"],
  },
});

export default withMDX(nextConfig);
