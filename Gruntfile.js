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

        browserify: {
            'main.js': ['js/**/*.js'],
            options: {
                banner: '/*! <%= pkg.name %>.js <%= pkg.version %> | Connor Cartwright (@ConnorCartwright)*/',
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
                    'css/style.css' : 'css/style.scss'
                }
            }
        },

        scsslint: {
            allFiles: [
                'css/**/*.scss',
            ],
            options: {
                config: './config/.scss-lint.yml',
                colorizeOutput: true
            },
        },

        jscs: {
            options: {
                config: './config/.jscsrc',
                fix: true
            },
            src: [
                '<%= config.src %>/**/*.js'
            ]
        },

        jshint: {
            options: {
                jshintrc: './config/.jshintrc',
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
                tasks: ['jshint', 'jscs', 'browserify']
            },
            css: {
                files: ['css/**/*.scss'],
                tasks: ['scsslint', 'sass']
            }
        },

        concurrent: {
            lint: ['jshint', 'jscs', 'scsslint'],
            combine: ['browserify', 'sass']
        }
    });

    grunt.registerTask('default', ['concurrent']);
    grunt.registerTask('dev', ['concurrent', 'watch']);

};