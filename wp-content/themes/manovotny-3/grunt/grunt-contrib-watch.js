module.exports = function (grunt) {

    'use strict';

    var config = require('config');

    grunt.config('watch', {
        css: {
            files: [
                config.paths.admin + '/' + config.paths.sass + '/**/*.scss',
                config.paths.sass + '/**/*.scss'
            ],
            tasks: [
                'css'
            ]
        },
        js: {
            files: [
                config.paths.admin + '/' + config.paths.js + '/**/*.js',
                config.paths.js + '/**/*.js',

                '!' + config.paths.admin + '/' + config.paths.js + '/**/*.min.js',
                '!' + config.paths.js + '/**/*.min.js'
            ],
            tasks: [
                'js'
            ]
        }
    });

};