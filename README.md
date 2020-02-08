有 js/ts的版本  切换不同分支即可

js使用方式:

安装yarn&&gulp
npm install -g yarn

使用yarn安装本地依赖 

`yarn init`
`yarn add --dev/-D`

使用gulp进行构建
`npm install --save-dev gulp`

新建gulpfile.js 填写配置

1.gulp.task()：创建一个任务，第一个参数为任务名，第二个为要执行的任务函数；

2.gulp.src() ：要处理的文件路径，还有一些其他参数可以设置，这个就需要自己去看API了，用途就是选择要处理的文件；

3..pipe()：要执行的管道操作，gulp就是将一个个文件放置到管道里面进行处理的；

4..pipe(gulp.dest())：处理完后的文件放置到何位置；

5.gulp.watch()：监听一个或者多个文件，然后执行某些任务。

命令行输入：
`gulp` 即可完成打包

ts使用方式类似

需要编译 tsc


打开`index.html`即可运行
