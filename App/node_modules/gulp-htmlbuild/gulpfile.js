'use strict';

var gulp  = require('gulp'),
    plugins = require('gulp-load-plugins')();


gulp.task('mocha', function () {
  
  gulp.src('./test/**/*.spec.js', {read: false})
    .pipe(plugins.mocha({
      reporter: 'spec'
    }))
    .on('error', function (error) {
      console.log(error.name, error.message);
    });
  
});


gulp.task('mocha-watch', ['mocha'], function () {
  
  gulp.watch([
    './lib/**/*.js',
    './test/**/*.spec.js'
  ], ['mocha']);
  
});
