module.exports = function (grunt) {

    'use strict';

    grunt.config('shell', {
        install: {
            command: [
                'bower install',
                'composer install'
            ].join('&&')
        },
        update: {
            command: [
                'npm prune',
                'npm-check-updates -u',
                'npm update',
                'npm update caniuse-db',
                'bower prune',
                'bower update',
                'composer update'
            ].join('&&')
        }
    });

};