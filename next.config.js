const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Disabling on production builds because we're running checks on PRs via GitHub Actions.
        ignoreDuringBuilds: true,
    },
    experimental: {
        mdxRs: true,
    },
    pageExtensions: ["jsx", "mdx", "tsx"],
};

module.exports = withMDX(nextConfig);
