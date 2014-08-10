module.exports = function (grunt) {

    'use strict';

    var config = require('config'),
        previous = require('../config/previous.js'),
        overwrite = true;

    grunt.config('replace', {
        authorEmail: {
            src: [
                '**/*.json',
                '**/*.php'
            ],
            overwrite: overwrite,
            replacements: [
                {
                    from: '"email": "' + previous.author.email + '"',
                    to: '"email": "' + config.author.email + '"'
                },
                {
                    from: ' <' + previous.author.email + '>',
                    to: ' <' + config.author.email + '>'
                }
            ]
        },
        authorName: {
            src: [
                '**/*.json',
                '**/*.php'
            ],
            overwrite: overwrite,
            replacements: [
                {
                    from: '@author ' + previous.author.name,
                    to: '@author ' + config.author.name
                },
                {
                    from: 'Author: ' + previous.author.name,
                    to: 'Author: ' + config.author.name
                },
                {
                    from: '"author": "' + previous.author.name,
                    to: '"author": "' + config.author.name
                },
                {
                    from: '"name": "' + previous.author.name + '"',
                    to: '"name": "' + config.author.name + '"'
                }
            ]
        },
        authorUrl: {
            src: [
                '**/*.json',
                '**/*.php'
            ],
            overwrite: overwrite,
            replacements: [
                {
                    from: '"homepage": "' + previous.author.url + '"',
                    to: '"homepage": "' + config.author.url + '"'
                },
                {
                    from: ' <' + previous.author.url + '>',
                    to: ' <' + config.author.url + '>'
                }
            ]
        },
        projectComposer: {
            src: [
                config.files.composer
            ],
            overwrite: overwrite,
            replacements: [
                {
                    from: '"name": "' + previous.project.composer + '"',
                    to: '"name": "' + config.project.composer + '"'
                }
            ]
        },
        projectCopyright: {
            src: [
                '**/*.php'
            ],
            overwrite: overwrite,
            replacements: [
                {
                    from: '@copyright ' + previous.project.copyright,
                    to: '@copyright ' + config.project.copyright
                }
            ]
        },
        projectDescription: {
            src: [
                '*.php',
                config.files.bower,
                config.files.composer,
                config.files.package,
                config.files.readme
            ],
            overwrite: overwrite,
            replacements: [
                {
                    from: '"description": "' + previous.project.description + '"',
                    to: '"description": "' + config.project.description + '"'
                },
                {
                    from: 'Description: ' + previous.project.description,
                    to: 'Description: ' + config.project.description
                },
                {
                    from: '* ' + previous.project.description,
                    to: '* ' + config.project.description
                },
                {
                    from: previous.project.description,
                    to: config.project.description
                }
            ]
        },
        projectGit: {
            src: [
                config.files.bower,
                config.files.package
            ],
            overwrite: overwrite,
            replacements: [
                {
                    from: '"url": "' + previous.project.git + '"',
                    to: '"url": "' + config.project.git + '"'
                }
            ]
        },
        projectName: {
            src: [
                '*.php'
            ],
            overwrite: overwrite,
            replacements: [
                {
                    from: 'Plugin Name: ' + previous.project.name,
                    to: 'Plugin Name: ' + config.project.name
                }
            ]
        },
        projectPackage: {
            src: [
                '**/*.php'
            ],
            overwrite: overwrite,
            replacements: [
                {
                    from: '@package ' + previous.project.package,
                    to: '@package ' + config.project.package
                }
            ]
        },
        projectSlug: {
            src: [
                config.files.bower,
                config.files.package,
                config.files.readme
            ],
            overwrite: overwrite,
            replacements: [
                {
                    from: '"name": "' + previous.project.slug + '"',
                    to: '"name": "' + config.project.slug + '"'
                },
                {
                    from: previous.project.slug,
                    to: config.project.slug
                }
            ]
        },
        projectUrl: {
            src: [
                '*.php',
                config.files.composer
            ],
            overwrite: overwrite,
            replacements: [
                {
                    from: '"homepage": "' + previous.project.url + '"',
                    to: '"homepage": "' + config.project.url + '"'
                },
                {
                    from: '@link ' + previous.project.url,
                    to: '@link ' + config.project.url
                },
                {
                    from: 'Plugin URI: ' + previous.project.url,
                    to: 'Plugin URI: ' + config.project.url
                },
                {
                    from: 'GitHub Plugin URI: ' + previous.project.url,
                    to: 'GitHub Plugin URI: ' + config.project.url
                }
            ]
        },
        projectVersion: {
            src: [
                '*.php',
                config.paths.classes + '/**/*.php',

                config.files.bower,
                config.files.composer,
                config.files.package
            ],
            overwrite: overwrite,
            replacements: [
                {
                    from: '"version": "' + previous.project.version + '"',
                    to: '"version": "' + config.project.version + '"'
                },
                {
                    from: 'Version: ' + previous.project.version,
                    to: 'Version: ' + config.project.version
                },
                {
                    from: '$version = \'' + previous.project.version + '\'',
                    to: '$version = \'' + config.project.version + '\''
                }
            ]
        },
        updatePreviousAuthor: {
            src: [
                config.paths.grunt + '/grunt-text-replace.js'
            ],
            overwrite: overwrite,
            replacements: [
                {
                    from: "email: '" + previous.author.email + "'",
                    to: "email: '" + config.author.email + "'"
                },
                {
                    from: "name: '" + previous.author.name + "'",
                    to: "name: '" + config.author.name + "'"
                },
                {
                    from: "url: '" + previous.author.url + "'",
                    to: "url: '" + config.author.url + "'"
                }
            ]
        },
        updatePreviousProject: {
            src: [
                config.paths.config + '/previous.js'
            ],
            overwrite: overwrite,
            replacements: [
                {
                    from: "composer: '" + previous.project.copyright + "'",
                    to: "composer: '" + config.project.copyright + "'"
                },
                {
                    from: "copyright: '" + previous.project.copyright + "'",
                    to: "copyright: '" + config.project.copyright + "'"
                },
                {
                    from: "description: '" + previous.project.description + "'",
                    to: "description: '" + config.project.description + "'"
                },
                {
                    from: "git: '" + previous.project.git + "'",
                    to: "git: '" + config.project.git + "'"
                },
                {
                    from: "name: '" + previous.project.name + "'",
                    to: "name: '" + config.project.name + "'"
                },
                {
                    from: "package: '" + previous.project.package + "'",
                    to: "package: '" + config.project.package + "'"
                },
                {
                    from: "slug: '" + previous.project.slug + "'",
                    to: "slug: '" + config.project.slug + "'"
                },
                {
                    from: "url: '" + previous.project.url + "'",
                    to: "url: '" + config.project.url + "'"
                },
                {
                    from: "version: '" + previous.project.version + "'",
                    to: "version: '" + config.project.version + "'"
                }
            ]
        }
    });

};