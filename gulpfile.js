const gulp = require('gulp');
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
	
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");

const browserSync = require("browser-sync").create();
const paths = {
    source : './scripts',
    build : "./js"
}
function scripts(){
    return (
        browserify({
            entries : [`${paths.source}/index.js`],
            transform : [babelify.configure({presets : ["@babel/preset-env"]})]
        })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(`${paths.build}/`))
    )
  }
function style(){
    const plugins = [
        autoprefixer({
            grid : true
        }),
    ]
    return gulp.src("./scss/**/*.scss")
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream())
}


function watch(){
    browserSync.init({
        server : {
            baseDir : './'
        }        
    });
    gulp.watch('./scss/**/*.scss',style);
    gulp.watch("./*.html").on("change",browserSync.reload);
    gulp.watch("./scripts/**/*.js",scripts).on("change",browserSync.reload);
}
exports.scripts = scripts;
exports.watch = watch;
exports.style = style;
