module.exports = function (grunt) {

    'use strict';

    var config = require('config'),
        predef = [
            'module',
            'require'
        ];

    grunt.config('jslint', {
        js: {
            directives: {
                nomen: true,
                predef: predef
            },
            src: [
                config.paths.config + '/*.js',
                config.paths.grunt + '/*.js',

                config.files.bower,
                config.files.composer,
                config.files.grunt,
                config.files.package
            ]
        }
    });

};