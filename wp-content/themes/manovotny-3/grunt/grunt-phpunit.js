module.exports = function (grunt) {

    'use strict';

    var config = require('config');

    grunt.config('phpunit', {
        options: {
            bin: config.paths.phpunit,
            bootstrap: config.paths.lib + '/wp-phpunit-helpers/wp-phpunit-helpers.php',
            colors: true
        },
        classes: {
            coverage: true,
            dir: config.paths.tests
        }
    });

};