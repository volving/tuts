'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);


    var config = {
        app: 'app',
        dist: 'dist',
        js: 'js',
        templates: 'templates'
    }


    grunt.initConfig({
        config: config,
        copy: {
            html: {
                //Normal formats:
                src: '<%= config.app %>/index.html',
                dest: '<%= config.dist %>/index.html'
            },

            ejs: {
                src: ['<%= config.app %>/templates/header.ejs', '<%= config.app %>/templates/footer.ejs'],
                // dest: ['<%= config.dist %>/templates/', '<%= config.dist %>/templates/']
                dest: '<%= config.dist %>/temp/'
            },
            js: {
                //File array formats:
                files: [{
                    expand: true // 动态src->dest, 本参数保证了下面cwd,ext,extDot的有效性
                        ,
                    cwd: '<%= config.app %>/js/',
                    src: '**/*.js',
                    dest: '<%= config.dist %>/js/plugin/',
                    ext: '.min.js' //是否更改后缀名
                        ,
                    extDot: 'first' //从那个位置的.开始修改后缀名{yo.a.js - > yo.min.js}
                        ,
                    flatten: false //是否展开目录,去掉中间文件夹/路径 
                        ,
                    rename: function(dest, src) {
                        return dest + 'js/' + src; //dest路径带有'/'
                    }


                }, {
                    src: '<%= config.js %>/index.js',
                    dest: '<%= config.dist %>/js/index.js'
                }]
            },
            css: {
                //File object formats:
                files: {
                    '<%= config.dist %>/css/main.css': '<%= config.app %>/css/main.css'
                }
            }
        },
        clean: {
            dist: {
                src: ['<%= config.dist %>/js/**/*'],
                filter: 'isFile' //nodejs: fs.Stats.{isFile(), isDirectory(), isBlockDevice(), isCharacterDevice(), isSymbolicLink(), isFIFO(), isSocket()}
            },
            dist_para: {
                src: ['<%= config.dist %>/temp/**/*'],
                filter: function(filepath) {
                    return (!grunt.file.isDir(filepath));
                },
                dot: true //命中以.开头的文件{.filename, filename}
                    ,
                matchBase: true // a?b => /xyz/123/acb /NO/ /xyz/acb/jjj


            },
            all: {
                src: '<%= config.dist %>/'
            }
        }


    })
};
