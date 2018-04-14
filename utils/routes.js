const path = require('path');

const globby = require('globby');

let routes;

module.exports.getRoutes = async () => {
    if (routes) {
        return routes;
    }

    routes = {
        '/': {page: '/'}
    };

    const posts = await globby('./posts/*');

    posts.forEach((post) => {
        const file = path.parse(post).name;
        const route = `/${file}`;

        routes[route] = {
            page: '/post'
        };
    });

    return routes;
};
