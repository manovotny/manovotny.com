const rehypePrism = require('@mapbox/rehype-prism');

const withMDX = require('@next/mdx')({
    extension: /\.(mdx)?$/,
    options: {
        rehypePlugins: [rehypePrism]
    }
});

module.exports = withMDX({
    pageExtensions: ['js', 'mdx'],
    target: 'serverless',
    webpack(config, {isServer}) {
        if (isServer) {
            require('./scripts/generate-sitemap');
        }
        return config;
    }
});
