module.exports = function (grunt) {

    'use strict';

    var config = require('config');

    grunt.config('clean', {
        lib: [
            config.files.composerLock,

            config.paths.config + '/' + config.files.sassLint,
            config.paths.lib
        ]
    });

};