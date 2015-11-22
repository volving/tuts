module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    var config = {
        _fe: 'fe',
        _static: 'static',
        _tmp: 'fe/tmp',
        _raw: 'fe/tmp/raw',

        _console: 'fe/console',
        _console_src: 'fe/console/src',
        _console_dist: 'fe/console/dist',

        _www: 'fe/www',
        _www_src: 'fe/www/src',
        _www_dist: 'fe/www/dist',


        _vendor: 'bower_components'
    };

    grunt.initConfig({
        config: config,
        clean: {
            vendor: {
                src: '<%= config._static %>/vendor/*'
            },
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= config._static %>',
                    src: '**/*.js'
                }, {
                    expand: true,
                    cwd: '<%= config._fe %>',
                    src: '**/*/dist/**/*.js'
                }, {
                    expand: true,
                    cwd: '<%= config._tmp %>',
                    src: '**/*.js'
                }]
            },
            css: {
                // files:['<%= config._static %>/**/*.css',
                //     '<%= config._fe %>/**/*/dist/**/*.css',
                //     '<%= config._tmp %>/**/*.css']
                files: [{
                    expand: true,
                    cwd: '<%= config._static %>',
                    src: '**/*.css'
                }, {
                    expand: true,
                    cwd: '<%= config._fe %>',
                    src: '**/*/dist/**/*.css',
                }, {
                    expand: true,
                    cwd: '<%= config._tmp %>',
                    src: '**/*.css'
                }]
            },
            statics: {
                src: ['<%= config._static %>/*', '<%= config._tmp %>/*']
            }

        },
        less: {
            options: {
                compress: false
            },
            console: {
                files: [{
                    expand: true,
                    cwd: '<%= config._console_src %>',
                    src: '**/*.less',
                    dest: '<%= config._console_dist %>',
                    ext: '.css',
                    extDot: 'last'
                }]
            },
            www: {
                files: [{
                    expand: true,
                    cwd: '<%= config._www_src %>',
                    src: '**/*.less',
                    dest: '<%= config._www_dist %>',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['> 2% in US', 'last 4 versions', 'IE 9', 'IE 10']
            },
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config._fe %>',
                    src: '**/*/dist/**/*.css',
                    dest: '<%= config._raw %>',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config._raw %>',
                    src: '**/*/dist/**/*.css',
                    dest: '<%= config._fe %>/',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                undef: true,
                debug: true,
                // '-W015': true,
                globals: {
                    jQuery: true,
                    nodejs: true
                },
                ignores:{

                }
            },
            // target: {
            //     // files: [{
            //     //     expand: true,
            //     //     cwd: '<%= config._fe %>',
            //     //     src: '**/*/src/**/*.js',
            //     // }]
            // }
        },

        // concat: {
        //     options:{
        //         separator:';'
        //     },
        //     console:{
        //         files: [{
        //             expand: true,
        //             cwd: '<%= config._console_src %>',
        //             src: '**/*.js',
        //             dest: '<%= config._raw %>/console/dist/js/console.js'
        //         }]
        //     },
        //     www:{
        //         files: [{
        //             expand: true,
        //             cwd: '<%= config._www_src %>',
        //             src: '**/*.js',
        //             dest: '<%= config._raw %>/www/dist/www.js'
        //         }]
        //     }
        // },
        uglify: {
            console: {
                files: [{
                    expand: true,
                    cwd: '<%= config._console_src %>',
                    src: '**/*.js',
                    dest: '<%= config._console_dist %>',
                    ext: '.js',
                    extDot: 'last'
                }]
            },
            www: {
                files: [{
                    expand: true,
                    cwd: '<%= config._www_src %>',
                    src: '**/*.js',
                    dest: '<%= config._www_dist %>',
                    ext: '.js',
                    extDot: 'last'
                }]
            }
        },
        copy: {
            vendor:{
                files: [{
                    expand: true,
                    cwd: '<%= config._vendor %>',
                    src: ['**/*/dist/**/*.js', '**/*/dist/**/*.css', '**/*/dist/**/*.map'],
                    dest: '<%= config._static %>/vendor/'
                }],
            },
            mincss: {
                files: [{
                    expand: true,
                    cwd: '<%= config._console_dist %>',
                    src: '**/*.css',
                    dest: '<%= config._static %>/console/dist/css/',
                    ext: '.css',
                    extDot: 'last'
                },{
                    expand: true,
                    cwd: '<%= config._www_dist %>',
                    src: '**/*.css',
                    dest: '<%= config._static %>/www/dist/css/',
                    ext: '.css',
                    extDot: 'last'
                }]
            },
            raw: {
                files: [{
                    expand: true,
                    cwd: '<%= config._raw %>',
                    src: '**/*/dist/**/*.css',
                    dest: '<%= config._static %>',
                    ext: '.css',
                    extDot: 'last'
                }]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= config._fe %>',
                    src: '**/*/dist/**/*.js',
                    dest: '<%= config._static %>',
                    ext: '.js',
                    extDot: 'last'
                }]
            },
            sourcejs: {
                files: [{
                    expand: true,
                    cwd: '<%= config._console_src %>',
                    src: '**/*.js',
                    dest: '<%= config._static %>/console/dist/',
                    ext: '.js',
                    extDot: 'last'
                }, {
                    expand: true,
                    cwd: '<%= config._www_src %>',
                    src: '**/*.js',
                    dest: '<%= config._static %>/www/dist/',
                    ext: '.js',
                    extDot: 'last'
                }]
            }
        },
        watch: {
            options: {
                // reload: true,
                livereload: true,
                interrupt: false,
                spawn: true
            },
            gconf: {
                options: {
                    reload: true
                },
                files: 'Gruntfile.js'
            },
            css: {
                options: {
                    interrupt: true,
                    spawn: true
                },
                files: '<%= config._fe %>/**/*/src/**/*.less',
                tasks: ['css2dev']
            },
            js: {
                options: {
                    interrupt: true,
                },
                files: '<%= config._fe %>/**/*/src/**/*.js',
                tasks: ['jssrc']
            }
        }
    });
    grunt.registerTask('lesser', ['less', 'autoprefixer']); //autoprefixer -->  config._raw
    grunt.registerTask('clesser', ['clean', 'less', 'autoprefixer']);
    grunt.registerTask('jser', ['jshint', 'uglify', 'copy:js']); // uglify --> config.**dist
    grunt.registerTask('jssrc', ['jshint', 'copy:sourcejs']);
    grunt.registerTask('css2dev', ['lesser', 'copy:raw']);
    grunt.registerTask('css2serve', [ 'clesser', 'cssmin', 'copy:mincss']);
    grunt.registerTask('dev', ['css2dev', 'jssrc', 'copy:vendor']);
    grunt.registerTask('serve', ['css2serve', 'jser', 'copy:vendor']);
    grunt.registerTask('default', ['watch']);

};
