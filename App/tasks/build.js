var gulp = require('gulp');
var paths = require('./paths');
var plugins = require('gulp-load-plugins')();
var es = require('event-stream');

// Build JavaScript
gulp.task('build:files', function () {
    var streamJS = gulp.src([paths.js.sources.bower, paths.js.sources.debug])
            .pipe(plugins.concat(paths.js.path.release + 'app.min.js'))
            .pipe(plugins.uglify())
            .pipe(gulp.dest(paths.root));

    var streamCSS = gulp.src([paths.css.sources.debug])
            .pipe(plugins.concat(paths.css.path.release + 'app.min.css'))
            .pipe(plugins.minifyCss())
            .pipe(gulp.dest(paths.root));

    return gulp.src(paths.index.source)
    .pipe(plugins.inject(es.merge(streamJS, streamCSS),
        { read: false, addRootSlash: false, relative: true }))
    .pipe(gulp.dest(paths.index.path))
});

// Move templates and minify
gulp.task('build:html', function () {
    return gulp.src(paths.templates.sources)
        .pipe(plugins.minifyHtml())
        .pipe(gulp.dest(paths.templates.path.release));
});

// Build Clean
gulp.task('build:clean', function () {
    return gulp.src([paths.js.sources.debug, paths.templates.path.debug, paths.css.sources.debug], { read: false })
        .pipe(plugins.clean({ force: true }));
});