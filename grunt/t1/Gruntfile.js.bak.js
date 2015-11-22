module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    var options = {};
    var config = {
        fe_root: 'fe',
        static_root: 'static',
        tmp: 'fe/tmp',

        console_root: 'fe/console',
        console_src: 'fe/console/src',
        console_dist: 'fe/console/dist',
        console_serve: 'static/console',

        www_root: 'fe/www',
        www_src: 'fe/www/src',
        www_dist: 'fe/www/dist',
        www_serve: 'static/www',

        vendor: 'static/vendor',
        bower: 'bower_components',
        bootstrap: 'bower_components/bootstrap/dist',
        jquery: 'bower_components/jquery/dist'
    };
    grunt.initConfig({
        config: config,
        clean: {
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= config.fe_root %>',
                    src: '**/*/dist/**/*.js'
                }]
            },
            css: {
                files: [{
                    expand: true,
                    cwd: '<%= config.fe_root %>',
                    src: '**/*/dist/**/*.css'
                }]
            },
            vendor: {
                src: '<%= config.vendor %>/*'
            },
            console: {
                files: [{
                    expand: true,
                    cwd: '<%= config.console_dist %>',
                    src: ['**/*.js', '**/*.css', '**/*.map']
                }]
            },
            www: {
                files: [{
                    expand: true,
                    cwd: '<%= config.www_dist %>',
                    src: ['**/*.js', '**/*.css', '**/*.map']
                }]
            },
            serve: {
                files: [{
                    expand: true,
                    cwd: '<%= config.static_root %>',
                    src: ['**/*']
                }]
            },
            tmp: {
                files: [{
                    expand: true,
                    src: ['<%= config.tmp %>/*']
                }]
            }
        },
        less: {
            options: {
                conpress: false,
                plugins: [
                    // new(require('less-plugin-autoprefix'))({
                    //     browsers: ['> 1%', 'last 2 versions', 'ie 10']
                    // }),
                    // new(require('less-plugin-clean-css'))(cleanCssOptions)
                ]
            },
            dev: {
                files: [{
                    // www
                    expand: true,
                    cwd: '<%= config.www_src %>',
                    src: '**/*.less',
                    dest: '<%= config.www_dist %>',
                    ext: '.css',
                    extDot: 'last'
                }, {
                    // www
                    expand: true,
                    cwd: '<%= config.console_src %>',
                    src: '**/*.less',
                    dest: '<%= config.console_dist %>',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
            // ,
            // dist:{
            // 	files:[{
            // 		expand: true,
            // 		cwd: '<%= config.fe_root %>',
            // 		src: '**/*/src/**/*.less',
            // 		dest: '<%= config.tmp %>/raw/',
            // 		ext: '.css',
            // 		extDot: 'last'
            // 	}]
            // }
        },
        autoprefixer: {
            options: {
                safe: true,
                remove: true,
                browsers: ['> 2% in US', 'last 2 versions', 'ie 8', 'ie 9']
            },
            // target:{
            // 	files: [{
            // 		expand: true,
            // 		cwd: '<%= config.fe_root %>',
            // 		src: '**/*/dist/**/*.css',
            // 	}]
            // },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.tmp %>/raw/',
                    src: '**/*.css',
                    dest: '<%= config.tmp %>/prefixed/'
                }]
            }
        },
        cssmin: {

            // minify:{
            // 	files: [{
            // 		expand: true,
            // 		cwd: '<%= config.fe_root %>',
            // 		src: ['**/*/dist/**/*.css', '!**/*/dist/**/*.min.css'],
            // 		dest: '<%= config.static_root %>',
            // 		ext: '.css',
            // 		extDot: 'last'
            // 	}]
            // },
            // combine:{

            // },

            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.tmp %>/prefixed/',
                    src: '**/*.css',
                    dest: '<%= config.static_root %>/',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
        },
        jshint: {
        	options:{
        		curly: true,
        		eqeqeq: true,
        		eqnull: true,
        		browser: true,
        		globals:{
        			jQuery: true
        		}
        	},
        	dist:{
        		files:[{
        			expand: true,
        			cwd: '<%= config.fe_root %>',
        			src: '**/*.js'
        		}]
        	}
        },

        uglify: {
            options: {
                banner: '/*! <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                mangle: true,
                compress: true
            },
            dist: {
                files: [{
                    expand: true,
                    //console
                    cwd: '<%= config.console_dist %>',
                    src: ['**/*.js'],
                    dest: '<%= config.console_serve %>',
                    ext: '.min.js',
                    extDot: 'last'
                }, {
                    expand: true,
                    //www
                    cwd: '<%= config.www_dist %>',
                    src: ['**/*.js'],
                    dest: '<%= config.www_serve %>'
                }]
            }
        },

        copy: {
            // vendor_bootstrap: {
            //     files: [{
            //         expand: true,
            //         cwd: '<%= config.bootstrap %>',
            //         src: ['**/*.map', '**/*.css', '**/*.js'],
            //         dest: '<%= config.vendor %>/bootstrap/'
            //     }]
            // },
            // vendor_jquery: {
            //     files: [{
            //         expand: true,
            //         cwd: '<%= config.jquery %>',
            //         src: ['**/*.map', '**/*.css', '**/*.js'],
            //         dest: '<%= config.vendor %>/jquery/'
            //     }]

            // },
            vendor: {
                files: [{
                    expand: true,
                    cwd: '<%= config.bower %>',
                    src: ['**/*/dist/**/*.map', '**/*/dist/**/*.css', '**/*/dist/**/*.js'],
                    dest: '<%= config.vendor %>/'
                }]
            },
            console: {
                files: [{
                    expand: true,
                    cwd: '<%= config.console_dist %>',
                    src: ['**/*.map', '**/*.css', '**/*.js'],
                    dest: '<%= config.console_serve %>/'
                }]
            },
            www: {
                files: [{
                    expand: true,
                    cwd: '<%= config.www_dist %>',
                    src: ['**/*.map', '**/*.css', '**/*.js'],
                    dest: '<%= config.www_serve %>/'
                }]

            },
            raw: {
                files: [{
                    expand: true,
                    cwd: '<%= config.fe_root %>',
                    src: '**/*/dist/**/*.css',
                    dest: '<%= config.tmp %>/raw/',
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.tmp %>/dist',
                    src: '**/*.css',
                    dest: '<%= config.static_root %>/'
                }]
            },
            js:{
            	files:[{
                    expand: true,
                    cwd: '<%= config.fe_root %>',
                    src: '**/*/src/**/*.js',
                    dist: '<%= config.tmp %>/raw/js/'
            	}]
            }
        },
        watch: {
            options: {
                reload: false,
                spawn: true,
                interrupt: false,
                livereload: true
            },
            Gconf: {
                options: {
                    reload: true
                },
                files: 'Gruntfile.js',
                events: 'all', //['change', 'save']
            },

            // bootstrap: {
            //     files: '<%= config.bootstrap %>/**/*.css',
            //     tasks: 'copy:vendor_bootstrap'
            // },
            // jquery: {
            //     files: '<%= config.jquery %>/**/*.css',
            //     tasks: 'copy:vendor_jquery'
            // },

            vendor: {
                files: '<%= config.bower %>/**/*/dist/**/*'
            },
            console: {
                files: '<%= config.console_src %>/**/*.less',
                tasks: ['less:dev', 'copy:raw', 'autoprefixer', 'copy:console']
            },
            www: {
                files: '<%= config.www_src %>/**/*.less',
                tasks: ['less:dev', 'autoprefixer', 'copy:www']
            }
        }
    });

    // grunt.loadNpmTasks();
    // grunt.registerTask('serve', ['clean', 'less:dev', 'copy:raw', 'autoprefixer', 'cssmin', 'jshint', 'copy:js', 'concat', 'clean:tmp']);
    grunt.registerTask('serve', ['clean', 'less:dev', 'copy:raw', 'autoprefixer', 'cssmin', 'jshint', 'uglify']);
    grunt.registerTask('dev', ['less', 'autoprefixer', 'copy', 'watch']);
    grunt.registerTask('default', ['dev']);
};
