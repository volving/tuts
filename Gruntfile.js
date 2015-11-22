module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    var config = {
        root: '.',
        hovertext: 'HoverText',
        css: 'CSS',
        stickynav: 'StickyNav'
    };

    grunt.initConfig({
        config: config,
        jshint: {
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            },
            gconf: {
                // files: 'Gruntfile.js',
                src: 'Gruntfile.js',
                // files: ['Gruntfile.js'],
                events: 'all'
            }
        },
        less: {
            hovertext: {
                files: [{
                    expand: true,
                    cwd: '<%= config.hovertext %>/css/src/',
                    src: '**/*.less',
                    dest: '<%= config.hovertext %>/css/dist/',
                    ext: '.css',
                    extDot: 'first'
                }]
            }
        },
        watch: {
            options: {
                interupt: false,
                spawn: true,
                reload: true
            },
            conf: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gconf']
            },
            less_hovertext: {
                files: ['<%= config.hovertext %>/**/*.less'],
                tasks: ['less']
            }

        }
    });

    //Register customized tasks:

    grunt.registerTask('default', ['jshint', 'less:hovertext', 'watch']);

};
