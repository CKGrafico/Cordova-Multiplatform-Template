var gulp = require('gulp');
var paths = require('./paths');
var runSequence = require('run-sequence');
var o = require('open');

gulp.task('watch', function () {
    gulp.watch(paths.scss.sources, ['default:scss']);
    gulp.watch(paths.templates.sources, ['default:html']);
    return gulp.watch(paths.ts.sources, ['default:ts']);
});

gulp.task('watch:test', function () {
    runSequence('default');
    gulp.watch(paths.scss.sources, ['default:scss']);
    return gulp.watch(paths.ts.sources, ['default:ts:test']);
});