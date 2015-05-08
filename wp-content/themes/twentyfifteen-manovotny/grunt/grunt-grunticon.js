module.exports = function (grunt) {

    'use strict';

    var config = require('config'),

        paths = {
            admin: '/admin',
            css: '/css/images',
            images: '/images',
            site: '/site'
        },
        source = [
            '*.svg'
        ];

    grunt.config('grunticon', {
        options: {
            cssprefix: '.',
            datapngcss: 'png.css',
            datasvgcss: 'svg.css',
            loadersnippet: 'loader.txt',
            template: 'bower_components/grunticon-templates/templates/width-and-height.min.hbs',
            urlpngcss: 'fallback.css'
        },
        admin: {
            files: [{
                expand: true,
                cwd: config.paths.source + paths.admin + paths.images,
                src: source,
                dest: config.paths.source + paths.admin + paths.css
            }]
        },
        site: {
            files: [{
                expand: true,
                cwd: config.paths.source + paths.site + paths.images,
                src: source,
                dest: config.paths.source + paths.site + paths.css
            }]
        }
    });

};
