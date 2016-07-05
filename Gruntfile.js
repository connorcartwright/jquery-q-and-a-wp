module.exports = function(grunt) {

    "use strict";

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        scsslint: 'grunt-scss-lint',
    });

    var config = {
        src: 'js',
        dist: 'dist'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: config,

        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: '\n'
            },
            dist: {
                // the files to concatenate
                src: ['js/**/*.js'],
                // the location of the resulting JS file
                dest: '<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        sass: {
            dist: {
                files: {
                    'css/style.css' : 'css/**/*.scss'
                }
            }
        },

        scsslint: {
            allFiles: [
                'css/**/*.scss',
            ],
            options: {
                config: '.scss-lint.yml',
                colorizeOutput: true
            },
        },

        jscs: {
            options: {
                config: '.jscsrc',
                fix: true
            },
            src: [
                '<%= config.src %>/**/*.js'
            ]
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
            },
            src: [
                '<%= config.src %>/**/*.js',
                'Gruntfile.js'
            ]
        },

        watch: {
            js: {
                files: ['js/**/*.js'],
                tasks: ['jslint', 'concat', 'uglify']
            },
            css: {
                files: ['css/**/*.scss'],
                tasks: ['scsslint', 'sass']
            }
        },

        concurrent: {
            jslint: ['jslint'],
            js: [['concurrent:jslint', 'concat', 'uglify']],
            css: [['scsslint', 'sass']],
            master: ['concurrent:js', 'concurrent:css']
        }
    });

    grunt.registerTask('jslint', [
        'jshint',
        'jscs'
    ]);

    grunt.registerTask('default', ['concurrent:master']);
    grunt.registerTask('dev', ['concurrent:master', 'watch']);

};