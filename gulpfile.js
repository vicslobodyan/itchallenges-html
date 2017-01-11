/*global -$ */
'use strict';

var gulp = require('gulp'),
    mainBowerFiles = require('main-bower-files'),
    $ = require('gulp-load-plugins')();

gulp.task('styles', ['clean:styles'], function () {
    return gulp.src([
            'source/less/main.less',
            'source/less/blocks/**/*.less'
        ])
        .pipe($.plumber())
        .pipe($.concat('main.less'))
        .pipe(gulp.dest('source/less/tmp'))
        .pipe($.less())
        .pipe($.postcss([
            require('autoprefixer-core')({browsers: ['last 3 version']}),
            require('css-mqpacker').postcss
        ]))
        .pipe($.concatCss('main.css'))
        .pipe($.csso())
        .pipe(gulp.dest('public/css'));
});

gulp.task('libraries', function() {
    return $.merge(
            gulp.src(mainBowerFiles()),
            gulp.src('source/js/vendor/*.js')
        )
        .pipe($.plumber())
        .pipe($.concat('vendor.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('public/js/lib'));
});

gulp.task('scripts', ['libraries'], function () {
    return gulp.src('source/js/*.js')
        .pipe($.plumber())
        .pipe($.concat('main.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('clean', ['clean:scripts', 'clean:styles']);

gulp.task('clean:scripts', function () {
    return gulp.src('public/js')
        .pipe($.clean());
});
gulp.task('clean:styles', function () {
    return gulp.src([
            'public/css',
            'source/less/tmp'
        ])
        .pipe($.clean());
});

gulp.task('compress-images', function() {
  gulp.src('source/images/**/*')
  .pipe($.imagemin())
  .pipe(gulp.dest('public/images'))
});

gulp.task('serve', ['build'], function () {
    gulp.watch('source/js/*.js', ['clean:scripts', 'scripts']);
    gulp.watch('source/less/**/**/*.less', ['styles']);
});

gulp.task('build', ['clean', 'compress-images'], function () {
    gulp.start('styles', 'scripts');
});

gulp.task('default', [], function () {
    gulp.start('build');
});