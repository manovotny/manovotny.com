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
        destination: `https://${blobHostname}/test-and-troubleshoot-wordpress-plugins-and-themes/presentation.pdf`,
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
