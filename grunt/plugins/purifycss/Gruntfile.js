module.exports = function(grunt) {
    require('time-grunt')(grunt);

    require('load-grunt-tasks')(grunt);


    grunt.initConfig({
        watch: {
            options: {
                spawn: false
            },
            configs: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },
            packages: {
                files: ['package.json'],
                options: {
                    reload: true
                }
            },
            purifycss: {
                files: ['./css/**/*.css'],
                tasks: ['purifycss:target']
            },
            wiredep: {
                files: ['./bower.json'],
                tasks: ['wiredep']
            },
            jshint: {
                files: ['./js/**/*.js'],
                tasks: ['jshint']
            }

        },
        jshint: {
            js: {
                src: ['./js/**/*.js']
            }
        },
        purifycss: {
            target: {
                src: ['./**/*.{html, jinja, ejs}'],
                css: ['./css/*.css'],
                dest: './tmp.css'
            }
        },
        wiredep: {
            htmls: {
                src: ['**/*.html']
            },
            jinja: {
                src: ['**/*.jinja']
            }
        }
    });
    /*
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.config('purifycss.targets.src', filepath);
    });
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.config('jshint.jses.files', filepath);
    });
    */
    grunt.registerTask('default', ['watch']);
}
