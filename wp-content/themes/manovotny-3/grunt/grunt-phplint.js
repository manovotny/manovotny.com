module.exports = function (grunt) {

    'use strict';

    var config = require('config');

    grunt.config('phplint', {
        files: [
            config.paths.admin + '/**/*.php',
            config.paths.classes + '/**/*.php',
            config.paths.inc + '/**/*.php',
            config.paths.tests + '/**/*.php',
            config.paths.views + '/**/*.php',
            '*.php'
        ]
    });

};