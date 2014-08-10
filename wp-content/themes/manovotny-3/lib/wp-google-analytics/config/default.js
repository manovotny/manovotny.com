module.exports = (function () {

    'use strict';

    return {
        author: {
            email: 'manovotny@gmail.com',
            name: 'Michael Novotny',
            url: 'http://manovotny.com'
        },
        files: {
            bower: 'bower.json',
            composer: 'composer.json',
            composerLock: 'composer.lock',
            grunt: 'Gruntfile.js',
            package: 'package.json',
            readme: 'README.md',
            sassLint: '.scss-lint.yml'
        },
        paths: {
            admin: 'admin',
            bower: 'bower_components',
            classes: 'classes',
            composer: 'vendor',
            config: 'config',
            css: 'css',
            grunt: 'grunt',
            inc: 'inc',
            js: 'js',
            lib: 'lib',
            phpunit: 'vendor/bin/phpunit',
            sass: 'sass',
            tests: 'tests'
        },
        project: {
            composer: 'manovotny/wp-google-analytics',
            copyright: '2014 Michael Novotny',
            description: 'Adds Google Analytics to WordPress sites.',
            git: 'git://github.com/manovotny/wp-google-analytics.git',
            name: 'WP Google Analytics',
            package: 'WP_Google_Analytics',
            slug: 'wp-google-analytics',
            url: 'https://github.com/manovotny/wp-google-analytics',
            version: '2.0.1'
        }
    };

}());
