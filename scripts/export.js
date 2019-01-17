const {cp, rm} = require('shelljs');
const execao = require('execa-output');
const Listr = require('listr');

const exportDirectory = 'out';

const tasks = new Listr([
    {
        task: () => rm('-rf', `${exportDirectory}/**/*.pxd/`),
        title: 'Removing unnecessary files'
    },
    {
        task: () => cp('-r', `${exportDirectory}/static/root/*`, `${exportDirectory}`),
        title: 'Copying static files to root'
    },
    {
        task: () => rm('-rf', `${exportDirectory}/index`),
        title: 'Removing index directory'
    },
    {
        task: () => rm('-rf', `${exportDirectory}/static/root`),
        title: 'Removing static root directory'
    },
    {
        task: () => execao('node', ['./scripts/sitemap.js']),
        title: 'Generating sitemap'
    }
]);

console.log(`Generating static site...`);

tasks
    .run()
    .then(() => console.log(`Export complete! 🎉`))
    .catch((error) => {
        console.error(error);
    });
