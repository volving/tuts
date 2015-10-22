'use strict';
module.exports = function(grunt){
    require('load-grunt-tasks');
    require('time-grunt');

    var config = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        config: config,

        copy:{
            src: '<%= config.app %>/index.html',
            dest: '<%= config.dist %>/'
        }
    })
}