import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disabled because it currently breaks syntax highlighting
  // experimental: { mdxRs: true },
  images: {
    remotePatterns: [
      {
        hostname: "ty3rozserpuox2as.public.blob.vercel-storage.com",
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
