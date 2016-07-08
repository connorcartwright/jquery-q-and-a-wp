module.exports = function(grunt) {

    "use strict";

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

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
                tasks: ['concurrent', 'concat', 'uglify']
            }
        },

        concurrent: {
            lint: ['jshint', 'jscs']
        }
    });

    grunt.registerTask('default', ['concurrent', 'browserify', 'uglify']);
    grunt.registerTask('dev', ['concurrent', 'browserify', 'uglify', 'watch']);

};