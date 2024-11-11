import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true,
  },
  experimental: {
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ty3rozserpuox2as.public.blob.vercel-storage.com",
      },
    ],
  },
  pageExtensions: ["mdx", "ts", "tsx"],
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

const withMDX = createMDX({});

export default withMDX(nextConfig);
