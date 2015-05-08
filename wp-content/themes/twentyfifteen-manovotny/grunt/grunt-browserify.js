module.exports = function (grunt) {

    'use strict';

    var _ = require('lodash'),
        collapse = require('bundle-collapser/plugin'),
        config = require('config'),
        glob = require('glob'),

        concatFilename = config.files.browserify + '.concat.js',
        minFilename = config.files.browserify + '.min.js',

        concatOptions = {
            debug: true
        },
        minOptions = {
            debug: true,
            plugin: [
                collapse
            ],
            transform: [
                'uglifyify'
            ]
        },

        adminFiles,
        adminDistPath = config.paths.source + '/admin/js/',
        adminSource = config.paths.source + '/admin/js/**/*.js',
        adminSources = [
            adminSource,
            '!' + config.paths.source + '/admin/js/**/' + config.files.browserify + '.*.js'
        ],

        siteFiles,
        siteDistPath = config.paths.source + '/site/js/',
        siteSource = config.paths.source + '/site/js/**/*.js',
        siteSources = [
            siteSource,
            '!' + config.paths.source + '/site/js/**/' + config.files.browserify + '.*.js'
        ],

        tasks = {};

    adminFiles = glob.sync(adminSource, {});

    if (!_.isEmpty(adminFiles)) {
        tasks.admin = {
            options: concatOptions,
            src: adminSources,
            dest: adminDistPath + concatFilename
        };

        tasks.admin_dist = {
            options: minOptions,
            src: adminSources,
            dest: adminDistPath + minFilename
        };
    }

    siteFiles = glob.sync(siteSource, {});

    if (!_.isEmpty(siteFiles)) {
        tasks.site = {
            options: concatOptions,
            src: siteSources,
            dest: siteDistPath + concatFilename
        };

        tasks.site_dist = {
            options: minOptions,
            src: siteSources,
            dest: siteDistPath + minFilename
        };
    }

    if (_.isEmpty(tasks)) {
        tasks.empty = {};
    }

    grunt.config('browserify', tasks);

};
