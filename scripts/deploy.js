const execa = require('execa');
const execao = require('execa-output');
const Listr = require('listr');
const {cd} = require('shelljs');

const exportDirectory = 'out';

const tasks = new Listr([
    {
        task: () => execao('yarn', ['export']),
        title: 'Exporting site'
    },
    {
        task: () => cd(exportDirectory),
        title: 'Switching to export directory'
    },
    {
        task: (ctx) =>
            execa.stdout('now').then((result) => {
                ctx.url = result;
            }),
        title: 'Running now'
    },
    {
        task: (ctx) => execa('now', ['alias', ctx.url, 'manovotny.now.sh']),
        title: 'Aliasing site'
    }
]);

console.log(`Deploying site...`);

tasks
    .run()
    .then(() => console.log('Deployment complete! 🎉'))
    .catch((error) => {
        console.error(error);
    });
