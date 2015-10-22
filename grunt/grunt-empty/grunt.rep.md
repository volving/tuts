# Grunt笔记

标签（空格分隔）： node grunt tut technique

---

grunt 安装依靠npm

```Shell
npm install -g grunt-cli
```

* grunt一般用与开发环境,所以node项目中安装grunt加参数`--save-dev`很必要.
* 加载package中指明的插件可以很简单: 安装 `load-grunt-tasks` 这个插件即可
* 命令行结果显示执行时间? 那就安装 `time-grunt`
* 文件复制: `grunt-contrib-copy`
* 文件删除: `grunt-contrib-clean`

```
npm install load-grunt-tasks time-grunt grunt-contrib-copy grunt-contrib-clean --save-dev

```

Gruntfile.js 之 结构
---

```JavaScript
module.exports = function(grunt){
    ...
};
```

在这个被导出的函数中:

```JavaScript
grunt.initConfig({...}); 
```

其中的参数:

```JavaScript
task1:{
    target1: {...},
    target2: {...},
    ...
},
task2:{
    target1: {...},
    target2: {...},
    ...
}
```

targets顺次执行:t1, t2...

```JavaScript
module.exports = function(grunt){
    require('time-grunt')(grunt);
    var config = {
        app: 'app',
        dist: 'dist'
    }
    grunt.initConfig({
        task1:{
            target1: {...},
            target2: {...},
            ...
        },
        task2:{
            target1: {...},
            target2: {...},
            ...
        }
    }); 
};
```

## 每个target都支持以下***N***种文件描述


### compact formats:

target:

```JavaScript
target: {
    src: '<%= config.app %>/templates/*.ejs',//数组 或 字串
    dest: '<%= config.dist %>/ejs/*.ejs'
}
```

### files array formats


***expand:true*** 加上这个参数就能保证 cwd, ext, extDot, flatten, rename等参数的有效性

***cwd: 工作目录***

***ext: 后缀名***, 希望更改就添加这个参数

***extDot:{first, last}*** 改名依据,标明从第几个开始改名

***flatten:{true, false}*** 直接扔到目标目录,去掉中间目录// js/user/ ** .js -> [dest]/ * .js

***rename: function(dest, src){...}*** //改名...

```JavaScript
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
```

### files object formats:


```JavaScript
files:{
    [destDir]:[srcDir],
    [destDir]:[srcDir]  
}
```




































