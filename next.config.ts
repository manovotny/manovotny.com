import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        // Disabling on production builds because we're running checks on PRs via GitHub Actions.
        ignoreDuringBuilds: true,
    },
    experimental: {
        mdxRs: true,
    },
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

export default nextConfig;
