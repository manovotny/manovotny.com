const getPort = require('get-port');
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
    .then(async () => {
        const server = express();
        const port = await getPort({port: 3000});

        server.get('/post/:id', (request, response) =>
            app.render(request, response, '/post', {
                id: request.params.id
            })
        );

        server.get('*', (request, response) =>
            handle(request, response)
        );

        server.listen(port, (error) => {
            if (error) {
                throw error;
            }

            console.log(`> Ready on http://localhost:${port}`)
        })
    });
