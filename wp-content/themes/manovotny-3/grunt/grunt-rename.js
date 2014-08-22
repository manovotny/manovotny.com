module.exports = function (grunt) {

    'use strict';

    var config = require('config'),
        replace = require('../config/replace.js');

    grunt.config('rename', {
        project: {
            src: replace.project.slug + '.php',
            dest: config.project.slug + '.php'
        }
    });

};