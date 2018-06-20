const {join} = require('path');

const globby = require('globby');
const getPort = require('get-port');
const express = require('express');
const next = require('next');
const {parse} = require('url');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
    .then(async () => {
        const server = express();
        const port = await getPort({port: 3000});
        const staticFiles = await globby('static/**/*');
        const rootFiles = staticFiles.map((file) => file.replace('static/', '/'));

        server.get('*', (request, response) => {
            const parsedUrl = parse(request.url, true);

            if (rootFiles.includes(parsedUrl.pathname)) {
                const path = join(__dirname, 'static', parsedUrl.pathname);

                return app.serveStatic(request, response, path);
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
