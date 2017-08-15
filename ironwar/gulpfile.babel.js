import path from 'path';
import gulp from 'gulp';
import gulpLess from 'gulp-less';
import gulpBabel from 'gulp-babel';
import gulpRename from 'gulp-rename';
import gulpUglify from 'gulp-uglify';
import gulpConcat from 'gulp-concat';
import gulpCssnano from 'gulp-cssnano';
import gulpSourcemaps from 'gulp-sourcemaps';


import glob from 'glob';
import babelify from 'babelify';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import source from 'vinyl-source-stream';

// ---------------------------------------------------- SERVER START----------------------------------------------------
// Compiling server side
// It use npm script "package.json"
gulp.task('move-server-dependencies', function () {
    gulp
        .src('dev/server/**/*.json')
        .pipe(gulp.dest('app/server'));
});
// ---------------------------------------------------- SERVER END------------------------------------------------------
// =====================================================================================================================
// ---------------------------------------------------- LESS START------------------------------------------------------
gulp.task('less', function() {
    return gulp.src('./dev/less/bundle.less')
        .pipe(gulpLess())
        .pipe(gulpRename('bundle.min.css'))
        .pipe(gulpSourcemaps.init({loadMaps: true}))
        .pipe(gulpCssnano())
        .pipe(gulpSourcemaps.write('./'))
        .pipe(gulp.dest('./src/css'));
});
// ----------------------------------------------------- LESS END ------------------------------------------------------
// =====================================================================================================================
// ---------------------------------------------------- ES6 START ------------------------------------------------------
gulp.task('es6', function () {
    glob('dev/js/*.bundle.js', function (er, files) {
        browserify({entries: files, extensions: '.bundle.js'})
            .transform(babelify, {sourceMaps: true})
            .bundle()
            .pipe(source('bundle.min.js'))
            // .pipe(buffer())
            // .pipe(gulpRename('bundle.min.js'))
            // .pipe(gulpSourcemaps.init({loadMaps: true}))
            // .pipe(gulpUglify())
            // .pipe(gulpSourcemaps.write('./'))
            .pipe(gulp.dest('src/js/'));
    });
});
// ------------------------------------------------------ ES6 END-------------------------------------------------------
gulp.task('watch', function() {
    gulp.watch('./dev/js/**/*.js', ['es6']);
    gulp.watch('./dev/less/**/*.less', ['less']);
});