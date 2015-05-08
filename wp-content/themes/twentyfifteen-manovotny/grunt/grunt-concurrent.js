module.exports = function (grunt) {

    'use strict';

    grunt.config('concurrent', {
        build: [
            'js',
            'css',
            'image'
        ]
    });

};
