const {ANALYZE} = process.env;
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = {
    experimental: {
        modern: true,
        rewrites: () => [
            {
                destination: '/api/sitemap',
                source: '/sitemap.xml'
            }
        ]
    },
    pageExtensions: ['js', 'mdx'],
    webpack: (config, {defaultLoaders, isServer}) => {
        if (ANALYZE) {
            config.plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: 'server',
                    analyzerPort: isServer ? 8888 : 8889,
                    openAnalyzer: true
                })
            );
        }

        config.module.rules.push({
            test: /\.mdx?$/u,
            use: [
                defaultLoaders.babel,
                {
                    loader: '@mdx-js/loader',
                    options: {
                        mdPlugins: []
                    }
                }
            ]
        });

        return config;
    }
};
