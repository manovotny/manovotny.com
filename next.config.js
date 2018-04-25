const withMDX = require('@zeit/next-mdx')();

const {getRoutes} = require('./utils/routes');

module.exports = withMDX({
    async exportPathMap () {
        return await getRoutes();
    }
});
