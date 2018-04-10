const {createServer} = require('http');
const {join} = require('path');
const {parse} = require('url');

const globby = require('globby');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        createServer(async (request, response) => {
            const parsedUrl = parse(request.url, true);
            const staticFiles = await globby('static/**/*');
            const rootFiles = staticFiles.map((file) => file.replace('static/', '/'));

            if (rootFiles.indexOf(parsedUrl.pathname) > -1) {
                const path = join(__dirname, 'static', parsedUrl.pathname);

                app.serveStatic(request, response, path)
            } else {
                handle(request, response, parsedUrl)
            }
        })
        .listen(port, (error) => {
            if (error) {
                throw error;
            }

            console.log(`> Ready on http://localhost:${port}`)
        })
    });
