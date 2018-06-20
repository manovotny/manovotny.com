module.exports = {
    pageExtensions: [
        'js',
        'mdx'
    ],
    webpack: (config, {defaultLoaders}) => {
        config.module.rules.push({
            test: /\.mdx?$/,
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
