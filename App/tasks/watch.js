var gulp = require('gulp');
var paths = require('./paths');
var runSequence = require('run-sequence');

gulp.task('watch', function () {
    runSequence('default');
    gulp.watch(paths.scss.sources, ['default:scss']);
    return gulp.watch(paths.ts.sources, ['default:ts']);
});