module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jshint: {
            target1: {
                src: ['*.js'],
                options: {
                    curly: true,
                    eqeqeq: false,
                    undef: true,
                    unused: true,
                    force: true
                }
            }
        }
    });



    grunt.registerTask('default', ['jshint']);
};
