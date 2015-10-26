module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var config = {
        src: './',
        dist: './',
        static: './static',
        root: './'
    };

    grunt.initConfig({
        config: config,
        htmlmin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/',
                    src: '**/*.jinja',
                    dest: '<%= config.src %>/tmp/',
                    ext: '.jinja',
                    extDot: 'last'
                }]
            }
        },
        watch: {
            options: {
                spawn: true,
                interrupt: false,
                reload: true
            },
            gruntConf: {
                files: ['./Gruntfile.js'],
                event: ['change', 'save'],
                tasks: ['jshint:gcf']
            },
            jinja: {
                files: ['<%= config.src %>/**/*.jinja'],
                event: 'all',
                tasks: ['htmlmin']
            },
        },

    });

    grunt.registerTask('default', ['htmlmin:dev']);
};
