'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./paths');

var karma = require('karma');

var pathSrcHtml = [
  path.join(conf.index.path, '**/*.html')
];

var pathSrcJs = [
   conf.js.sources.debug
];

function runTests (singleRun, done) {
  var reporters = ['spec'];
  var preprocessors = {};

  pathSrcHtml.forEach(function(path) {
    preprocessors[path] = ['ng-html2js'];
  });

  if (singleRun) {
    pathSrcJs.forEach(function(path) {
      preprocessors[path] = ['coverage'];
    });
    reporters.push('coverage')
  }

  var localConfig = {
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: singleRun,
    autoWatch: !singleRun,
    reporters: reporters,
    preprocessors: preprocessors
  };

  var server = new karma.Server(localConfig, function(failCount) {
    done(failCount ? console.error("Failed " + failCount + " tests.") : null);
  })
  server.start();
}

gulp.task('test', ['default:ts:test', 'default:html'], function(done) {
  runTests(true, done);
});

gulp.task('test:auto', ['watch:test'], function(done) {
  runTests(false, done);
});
