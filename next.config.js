const withMdxc = require('@zeit/next-mdxc');

const {getRoutes} = require('./utils/routes');

module.exports = withMdxc({
    async exportPathMap () {
        return await getRoutes();
    }
});
