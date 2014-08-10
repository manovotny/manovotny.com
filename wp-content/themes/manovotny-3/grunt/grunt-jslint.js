module.exports = function (grunt) {

    'use strict';

    var config = require('config'),
        exclude = [
            'module',
            'require'
        ];

    grunt.config('jslint', {
        js: {
            directives: {
                browser: true,
                nomen: true,
                predef: exclude
            },
            src: [
                config.paths.admin + '/' + config.paths.js + '/**/*.js',
                config.paths.config + '/*.js',
                config.paths.grunt + '/*.js',
                config.paths.js + '/**/*.js',

                config.files.bower,
                config.files.composer,
                config.files.grunt,
                config.files.package,

                '!' + config.paths.admin + '/' + config.paths.js + '/**/*.min.js',
                '!' + config.paths.js + '/**/*.min.js'
            ]
        }
    });

};