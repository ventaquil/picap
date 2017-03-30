'use strict';

const clean = require('gulp-clean-css');
const concat = require('gulp-concat');
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const source_maps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

gulp.task('sass', function () {
    return gulp.src('./assets/sass/layout.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('watch:sass', ['sass'], function () {
    gulp.watch('./assets/sass/**/*.scss', ['sass']);
});

gulp.task('minify-css', ['sass'], function () {
    return gulp.src('./public/css/styles.css')
        .pipe(clean())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('css-map', ['minify-css'], function () {
    return gulp.src('./public/css/styles.min.css')
        .pipe(source_maps.init())
        .pipe(source_maps.write('./'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('javascript', function () {
    gulp.src(['./assets/javascript/layout.js', './assets/javascript/picture.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./public/javascript'))
});

gulp.task('watch:javascript', ['javascript'], function () {
    gulp.watch('./assets/javascript/**/*.js', ['javascript']);
});

gulp.task('uglify-javascript', ['javascript'], function () {
    return gulp.src('./public/javascript/scripts.js')
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('./public/javascript'));
});

gulp.task('javascript-map', ['uglify-javascript'], function () {
    return gulp.src('./public/javascript/scripts.min.js')
        .pipe(source_maps.init())
        .pipe(source_maps.write('./'))
        .pipe(gulp.dest('./public/javascript'));
});


gulp.task('watch', ['watch:sass', 'watch:javascript']);

gulp.task('default', ['css-map', 'javascript-map']);
