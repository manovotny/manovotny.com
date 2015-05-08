module.exports = (function () {

    'use strict';

    return {
        author: {
            email: 'manovotny@gmail.com',
            name: 'Michael Novotny',
            url: 'http://manovotny.com',
            username: 'manovotny'
        },
        files: {
            browserify: 'bundle'
        },
        paths: {
            curl: 'curl_downloads',
            source: 'src',
            translations: 'lang'
        },
        project: {
            composer: {
                name: 'manovotny/manovotny',
                type: 'project' // Should be `library` or `project`.
            },
            description: 'Custom Twenty Fifteen WordPress child theme for Michael Novotny/',
            git: 'git://github.com/manovotny/manovotny.com.git',
            name: 'Michael Novotny',
            slug: 'manovotny',
            type: 'theme', // Should be `plugin` or `theme`.
            url: 'https://github.com/manovotny/manovotny.com',
            version: '1.0.0'
        }
    };

}());
