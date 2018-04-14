const {getRoutes} = require('./utils/routes');

module.exports = {
    async exportPathMap () {
        return await getRoutes();
    }
};
