'use strict';

var path = require('path');
var gulp = require('gulp');
var Q = require('q');
var conf = require('./paths');
var plugins = require('gulp-load-plugins')();

// Downloads the selenium webdriver
gulp.task('webdriver-update', plugins.protractor.webdriver_update);

gulp.task('webdriver-standalone', plugins.protractor.webdriver_standalone);

function runProtractor (mode) {
  var deferred = Q.defer();
  var params = process.argv;
  var args = params.length > 3 ? [params[3], params[4]] : [];
  var config;
  if (mode === 'ionic'){
    config = 'protractor.conf.js'
  }
  if (mode === 'ripple'){
    config = 'protractor.conf.ripple.js'
  }
  gulp.src(conf.e2e)
    .pipe(plugins.protractor.protractor({
      configFile: config,
      args: args
    }))
    .on('error', function (err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    })
    .on('end', function () {
      deferred.resolve();
    });
    return deferred.promise;
}

gulp.task('protractor', ['protractor:ionic', 'serve:test:stop']);
gulp.task('protractor:ionic', ['serve:test', 'webdriver-update'], function(done){
  runProtractor('ionic').then(function(){
    done(); //some sort of bug, you must manually stop it by pressing ctrl+c
  });
});

