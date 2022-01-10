import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import { path } from './gulp/config/path.js'
import concat from 'gulp-concat'
import { copy } from './gulp/tasks/copy.js'
import { reset } from './gulp/tasks/reset.js'
import htmlMin from "gulp-htmlmin"
import dartSass from 'sass'
import csso from 'gulp-csso'
import cleanCSS from 'gulp-clean-css'
import GulpUglify from 'gulp-uglify'
import image from 'gulp-image';
import minify from 'gulp-minify'

const sass = gulpSass(dartSass)

global.app = {
    path,
    gulp
}

const copyHtml = () => {
    return gulp.src(path.src.html)
        .pipe(app.gulp.dest(path.build.html))
}

const OptimizeHtml = () => {
    return gulp.src(path.src.html)
        .pipe(htmlMin({
            collapseWhitespace: true, // удаляем все переносы
            removeComments: true // удаляем все комментарии
        }))
        .pipe(app.gulp.dest(path.build.html))
}

const scss = () => {
    return gulp.src('src/scss/**.scss')
        .pipe(sass())
        // .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist'))
}


function img() {
    return gulp.src('src/img/**/*.*')
        .pipe(image())
        .pipe(gulp.dest('./dist/img/'));
}


function fonts() {
    return gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('./dist/fonts/'))
}



function js() {
    return gulp.src('src/js/**.js', { allowEmpty: true })
        .pipe(minify({ noSource: true }))
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist/js/'));
}


function watcher() {
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.html, OptimizeHtml)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.img, img)
    gulp.watch(path.watch.fonts, fonts)
}


function watcherHtml() {
    gulp.watch(path.watch.html, OptimizeHtml)
}

const dev = gulp.series(reset, copy, OptimizeHtml, scss, js, img, fonts, watcher)

gulp.task('default', dev)

