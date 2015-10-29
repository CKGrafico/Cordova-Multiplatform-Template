var gulp = require('gulp');
var paths = require('./paths');
var plugins = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');
var base = 'bower_components';

// Download bower dependencies
gulp.task('initialize:bower:install', function () {
    return plugins.bower();
});

gulp.task('initialize:tsd', function () {
    return gulp.src(paths.ts.tsd).pipe(plugins.tsd());
});

// Move bower packages to each folder
gulp.task('initialize:bower', ['initialize:bower:install'], function () {
    gulp.src(mainBowerFiles('**/*.scss'), { base: base })
        .pipe(gulp.dest(paths.scss.bower));

    gulp.src(mainBowerFiles('**/*.js'), { base: base })
        .pipe(gulp.dest(paths.js.path.bower));

    return gulp.src(mainBowerFiles('**/fonts/**.*'), { base: base })
        .pipe(gulp.dest(paths.fonts.bower));
});