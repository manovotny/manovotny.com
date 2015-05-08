module.exports = function (grunt) {

    'use strict';

    var config = require('config'),

        paths = {
            admin: '/admin',
            data: '/data',
            images: '/images',
            png: '/css/images/png',
            site: '/site'
        },
        source = {
            png: [
                '*.png'
            ],
            svg: [
                '*.svg'
            ]
        };

    grunt.config('imagemin', {
        options: {
            svgoPlugins: [
                { removeDesc: true },
                { removeTitle: true }
            ]
        },
        png: {
            files: [
                {
                    expand: true,
                    cwd: config.paths.source + paths.admin + paths.png,
                    src: source.png,
                    dest: config.paths.source + paths.admin + paths.png
                },
                {
                    expand: true,
                    cwd: config.paths.source + paths.site + paths.png,
                    src: source.png,
                    dest: config.paths.source + paths.site + paths.png
                }
            ]
        },
        svg: {
            files: [
                {
                    expand: true,
                    cwd: config.paths.source + paths.admin + paths.images,
                    src: source.svg,
                    dest: config.paths.source + paths.admin + paths.images
                },
                {
                    expand: true,
                    cwd: config.paths.source + paths.admin + paths.images + paths.data,
                    src: source.svg,
                    dest: config.paths.source + paths.admin + paths.images + paths.data
                },
                {
                    expand: true,
                    cwd: config.paths.source + paths.site + paths.images,
                    src: source.svg,
                    dest: config.paths.source + paths.site + paths.images
                },
                {
                    expand: true,
                    cwd: config.paths.source + paths.site + paths.images + paths.data,
                    src: source.svg,
                    dest: config.paths.source + paths.site + paths.images + paths.data
                }
            ]
        }
    });

};
