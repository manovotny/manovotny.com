const withMdxc = require('@zeit/next-mdxc');

module.exports = withMdxc({
    exportPathMap: () => ({
        '/': {page: '/'},
        '/fix-wordpress-admin-styles-not-loading': {page: '/post'},
    })
});
