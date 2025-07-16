import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkSugarHigh from "remark-sugar-high";

const nextConfig: NextConfig = {
  eslint: {
    // Disabled on builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true,
  },
  // Disabled because it currently breaks syntax highlighting
  // experimental: { mdxRs: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ty3rozserpuox2as.public.blob.vercel-storage.com",
      },
    ],
  },
  pageExtensions: ["mdx", "tsx"],
  async redirects() {
    return [
      {
        source: "/phpstorm-keyboard-shortcuts",
        destination: "/",
        permanent: true,
      },
      {
        source: "/setup-phpstorm-xdebug-mamp-debugging",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [rehypeUnwrapImages],
    remarkPlugins: [remarkSugarHigh],
  },
});

export default withMDX(nextConfig);
