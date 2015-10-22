module.exports = function(grunt) {
    require('load-grunt-tasks');
    require('time-grunt');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({
        jshint: {
            options: {
                ignores: ['bower_comp/', 'node_module']
            },
            js: {
                files: [{
                    cwd: './',
                    src: ['./*.js', './config/**/*.js', './lib/**/*.js']
                }]
            }

        }
    });

    // grunt.loadNpmTasks();

    grunt.registerTask('default', ['jshint']);
};
