module.exports = function (grunt) {

    'use strict';

    var config = require('config');

    grunt.config('clean', {
        css: [
            config.paths.admin + '/' + config.paths.css,
            config.paths.css
        ],
        js: [
            config.paths.admin + '/' + config.paths.js + '/**/*.concat.js',
            config.paths.admin + '/' + config.paths.js + '/**/*.min.js',
            config.paths.js + '/**/*.concat.js',
            config.paths.js + '/**/*.min.js'
        ],
        lib: [
            config.files.composerLock,

            config.paths.config + '/' + config.files.sassLint,
            config.paths.config + '/' + config.files.jshint,
            config.paths.lib
        ]
    });

};