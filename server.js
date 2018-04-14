const getPort = require('get-port');
const express = require('express');
const next = require('next');
const {parse} = require('url');

const {getRoutes} = require('./utils/routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
    .then(async () => {
        const server = express();
        const port = await getPort({port: 3000});
        const routes = await getRoutes();

        server.get('*', (request, response) => {
            const parsedUrl = parse(request.url, true);
            const {pathname} = parsedUrl;
            const route = routes[pathname];

            if (route) {
                return app.render(request, response, route.page);
            }

            return handle(request, response);
        });

        server.listen(port, (error) => {
            if (error) {
                throw error;
            }

            console.log(`> Ready on http://localhost:${port}`)
        })
    });
