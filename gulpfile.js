var gulp = require('gulp');
//自动打开浏览器
var open = require('open');
var htmlmin = require('gulp-htmlmin');//html压缩
//浏览起自动刷新
var connect = require('gulp-connect');
//合并文件
var concat = require('gulp-concat');
//压缩文件
var babel = require("gulp-babel"); //es6转es5
var browserify = require('browserify'); //如果使用了ES6的import，export就要使用 bowserify 转成require、export，生成文件
var uglify = require("gulp-uglify");
var gutil = require('gulp-util');       //提示js错误
var order = require("gulp-order");      //js按顺序
//图片压缩
var imagemin = require('gulp-imagemin');
//sass编译,压缩
var sass = require('gulp-sass');
var minifycss = require("gulp-minify-css");         //压缩css
var autoprefixer = require('gulp-autoprefixer');　　//调用gulp-autoprefixer插件,为自动化处理css前缀的.
//清除文件
var clean = require('gulp-clean');

//定义目录
var app = {
    //源代码，文件目录
    srcPath: 'src/',
    //文件整合之后的目录
    devPath: 'build/',
    //项目，发布目录上产部署
    prdPath: 'dist/'
}

//将 html 拷贝到 devPath prdPath中
gulp.task('html',function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src(app.srcPath + '**/*.html')
    .pipe(gulp.dest(app.devPath))
    .pipe(htmlmin(options))
    .pipe(gulp.dest(app.prdPath))
    .pipe(connect.reload());
});

// 拷贝 js 文件  将所有的源文件中的js 文件整合成index.js 然后拷贝过去
gulp.task('js',function(){ //公共文件
    gulp.src(app.srcPath + 'js/common/*.js')
    .pipe(babel())
    .pipe(order(["jquery.js","common.js","areaJosn.js","area.js"]))
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest(app.devPath + 'js'))
    .on('error', function (err) {
        gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest(app.prdPath + 'js'))
    .pipe(connect.reload());
});
gulp.task('scrpit',function(){ //单个文件
    gulp.src(app.srcPath + 'js/*.js')
    .pipe(babel())
    .pipe(gulp.dest(app.devPath + 'js'))
    .pipe(uglify())
    .on('error', function (err) {
        gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest(app.prdPath + 'js'))
    .pipe(connect.reload());
});

//将index.scss 文件 拷贝到 devPath prdPath中，index.scss引入了所有的其他的scss
gulp.task('sass',function(){
    gulp.src(app.srcPath + 'scss/index.scss')
    .pipe(sass())
    .on('error', sass.logError) // 错误信息
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(gulp.dest(app.devPath + 'css'))
    .pipe(gulp.dest(app.prdPath + 'css'))
    .pipe(connect.reload());
});

//拷贝 压缩 图片 最后放到发布目录下
gulp.task('image',function(){
    gulp.src(app.srcPath + 'image/**/*')
    //将源图片放到整合目录下，在压缩放到生产目录下
    .pipe(gulp.dest(app.devPath + 'image'))
    .pipe(imagemin())
    .pipe(gulp.dest(app.prdPath + 'image'))
    .pipe(connect.reload());
});

//总的方法
gulp.task('build', ['image', 'js','scrpit','sass', 'html']);

//清除旧文件，每次更新的时候
gulp.task('clean',function(){
    gulp.src([app.devPath,app.prdPath])
    .pipe(clean());
})

//编写服务
gulp.task('serve', ['build'], function() {
    connect.server({
        //服务起来的入口
        root: [app.devPath],
        //文件更改后自动刷新页面
        livereload: true,
        //ip
        host:"127.0.0.1",
        //端口号
        port: 1234
    });
    //自动打开浏览器
    open('http://127.0.0.1:1234');
    //监听方法
    gulp.watch(app.srcPath + 'js/common/*.js', ['js']);
    gulp.watch(app.srcPath + 'js/*.js', ['scrpit']);
    gulp.watch(app.srcPath + '**/*.html', ['html']);
    // gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
    gulp.watch(app.srcPath + 'scss/**/*.scss', ['sass']);
    gulp.watch(app.srcPath + 'image/**/*', ['image']);
    //这样文件变更了就会自动构建
});

//默认执行的任务，直接 执行 gulp 变行了。都编写完成后再终端 执行 gulp 便可以了。
gulp.task('default',  ['serve']);