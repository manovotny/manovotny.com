const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        mdxRs: true,
        serverActions: true,
    },
    pageExtensions: ["jsx", "mdx", "tsx"],
};

module.exports = withMDX(nextConfig);
