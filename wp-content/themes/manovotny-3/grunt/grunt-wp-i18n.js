module.exports = function (grunt) {

    'use strict';

    var config = require('config');

    grunt.config('makepot', {
        project: {
            options: {
                include: [
                    config.paths.admin + '/.*',
                    config.paths.classes + '/.*',
                    config.paths.inc + '/.*',
                    config.paths.views + '/.*'
                ],
                processPot: function (pot) {
                    pot.headers['report-msgid-bugs-to'] = config.project.url + '/issues';
                    pot.headers['language-team'] = config.author.name + ' <' + config.author.email + '>';
                    pot.headers['last-translator'] = config.author.name + ' <' + config.author.email + '>';

                    return pot;
                },
                type: 'wp-' + config.project.type
            }
        }
    });

};