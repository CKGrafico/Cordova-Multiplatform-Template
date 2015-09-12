'use strict';

var gulp  = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    htmlbuild = require('../lib'),
    es = require('event-stream');


// pipe a glob stream into this and receive a gulp file stream
var gulpSrc = function (opts) {
  var paths = es.through();
  var files = es.through();
  
  paths.pipe(es.writeArray(function (err, srcs) {
    gulp.src(srcs, opts).pipe(files);
  }));
  
  return es.duplex(paths, files);
};


var jsBuild = es.pipeline(
  plugins.concat('concat.js'),
  gulp.dest('./build/js')
);

var cssBuild = es.pipeline(
  plugins.concat('concat.css'),
  gulp.dest('./build/css')
);


gulp.task('build', function () {
  
  gulp.src(['./index.html'])
    .pipe(htmlbuild({
      // build js with preprocessor
      js: htmlbuild.preprocess.js(function (block) {
        
        block.pipe(gulpSrc({ root: __dirname }))
          .pipe(jsBuild);
        
        block.end('js/concat.js');
        
      }),
      
      // build css with preprocessor
      css: htmlbuild.preprocess.css(function (block) {
        
        block.pipe(gulpSrc({ root: __dirname }))
          .pipe(cssBuild);
        
        block.end('css/concat.css');
        
      }),
      
      // remove blocks with this target
      remove: function (block) {
        block.end();
      },
      
      // add a header with this target
      header: function (block) {
        es.readArray([
          '<!--',
          '  processed by htmlbuild',
          '-->'
        ].map(function (str) {
          return block.indent + str;
        })).pipe(block);
      }
    }))
    .pipe(gulp.dest('./build'));
  
});




gulp.task('js', function () {
  gulp.src('./js/**/*.js')
    .pipe(jsBuild);
});


gulp.task('css', function () {
  gulp.src('./css/**/*.css')
    .pipe(cssBuild);
});
