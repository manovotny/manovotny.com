const {parse} = require('path');

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
        const path = parse(post).name;
        const route = `/${path}`;

        routes[route] = {
            page: '/post'
        };
    });

    return routes;
};
