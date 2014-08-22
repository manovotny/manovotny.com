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
            bower: 'bower.json',
            composer: 'composer.json',
            composerLock: 'composer.lock',
            grunt: 'Gruntfile.js',
            jshint: '.jshintrc',
            package: 'package.json',
            readme: 'README.md',
            replace: 'replace.js',
            sassLint: '.scss-lint.yml',
            style: 'style.css'
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
            tests: 'tests',
            translations: 'lang',
            views: 'views'
        },
        project: {
            composer: 'manovotny/manovotny',
            copyright: '2014 Michael Novotny',
            description: 'Custom WordPress theme for Michael Novotny.',
            git: 'git://github.com/manovotny/manovotny.com.git',
            name: 'Michael Novotny',
            package: 'Michael_Novotny',
            slug: 'manovotny',
            type: 'theme', // Should be `plugin` or `theme`.
            url: 'https://github.com/manovotny/manovotny.com',
            version: '3.2.0'
        }
    };

}());
