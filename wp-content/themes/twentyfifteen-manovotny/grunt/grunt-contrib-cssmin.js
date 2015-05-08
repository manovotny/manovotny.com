module.exports = function (grunt) {

    'use strict';

    var _ = require('lodash'),
        config = require('config'),

        adminPath = config.paths.source + '/admin/css',
        sitePath = config.paths.source + '/site/css',

        baseTask = {
            options: {
                keepSpecialComments: 0
            },
            expand: true,
            src: [
                '*.css',
                '!*.min.css'
            ],
            ext: '.min.css'
        },
        adminTask = _.extend({
            cwd: adminPath,
            dest: adminPath
        }, baseTask),
        siteTask = _.extend({
            cwd: sitePath,
            dest: sitePath
        }, baseTask);

    grunt.config('cssmin', {
        admin: adminTask,
        site: siteTask
    });

};
