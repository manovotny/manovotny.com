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
    pageExtensions: ["mdx", "ts", "tsx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
