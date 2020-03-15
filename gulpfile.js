const gulp = require('gulp');
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer")
const browserSync = require("browser-sync").create();


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

}

exports.watch = watch
exports.style = style;
