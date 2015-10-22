module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            options: {
                spawn: false
            },
            configs: {
                files: ['./Gruntfile.js', './config/*.{js,json}'],
                options: {
                    reload: true
                }
            },
            bowerChange: {
                files: './bower.js',
                options: {
                    event: 'change'
                },
                tasks: ['wiredep']

            },
            htmlChange: {
                options: {
                    event: 'add'
                },
                files: ['*.html', './templates/**/*.html'],
                tasks: ['newer:wiredep:html']
            }
        },
        wiredep: {
            htmls: {
                src: ['*.html', './templates/**/*.html']
            },
            jinjas: {
                src: ['./templates/**/*.jinja']
            },
            ejses: {
                src: ['./templates/**/*.ejs']
            }
        }
    });
    grunt.registerTask('default', ['wiredep', 'watch']);
};
