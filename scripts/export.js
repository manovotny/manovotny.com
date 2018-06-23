const {cp, mv, rm} = require('shelljs');
const execa = require('execa');
const Listr = require('listr');

const exportDirectory = '.next-export';

const tasks = new Listr([
    {
        task: () => rm('-rf', exportDirectory),
        title: 'Removing export directory'
    },
    {
        task: () => execa('next', ['build']),
        title: 'Building site'
    },
    {
        task: () => execa('next', ['export', '-o', exportDirectory]),
        title: 'Exporting site'
    },
    {
        task: () =>
            cp('-r', `${exportDirectory}/static/*`, `${exportDirectory}`),
        title: 'Copying static files to root'
    },
    {
        task: () =>
            mv(
                `${exportDirectory}/_error/index.html`,
                `${exportDirectory}/404.html`
            ),
        title: 'Moving 404 page to root'
    },
    {
        task: () => rm('-rf', `${exportDirectory}/index`),
        title: 'Removing index directory'
    },
    {
        task: () => rm('-rf', `${exportDirectory}/_error`),
        title: 'Removing _error directory'
    },
    {
        task: () => rm('-rf', `${exportDirectory}/static`),
        title: 'Removing static directory'
    }
]);

console.log(`Generating static site...`); // eslint-disable-line no-console

tasks
    .run()
    .then(() => console.log(`Export complete! 🎉`)) // eslint-disable-line no-console
    .catch((error) => {
        console.error(error); // eslint-disable-line no-console
    });
