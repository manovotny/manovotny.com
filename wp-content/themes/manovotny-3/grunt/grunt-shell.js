module.exports = function (grunt) {

    'use strict';

    grunt.config('shell', {
        install: {
            command: [
                'npm install',
                'bower install',
                'composer install'
            ].join('&&')
        },
        update: {
            command: [
                'npm-check-updates -u',
                'npm update',
                'bower update',
                'composer update'
            ].join('&&')
        }
    });

};