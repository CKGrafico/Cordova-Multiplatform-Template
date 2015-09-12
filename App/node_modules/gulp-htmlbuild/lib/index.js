'use strict';

var es          = require('event-stream'),
    gutil       = require('gulp-util'),
    PluginError = gutil.PluginError,
    parser      = require('./parser'),
    builder     = require('./builder');

var PLUGIN_NAME = require('../package').name;


module.exports = function (config) {

  function htmlbuildFile(file, callback) {

    if (file.isNull()) {
      return callback(null, file); // pass along
    }
    
    if (file.isStream()) {
      return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported', {
        fileName: file.path
      }));
    }
    
    parser.parse(file)
      .pipe(builder.build(config))
      .pipe(es.wait(function (error, content) {
        file.contents = new Buffer(content);
        callback(error, file);
      }));
  }

  return es.map(htmlbuildFile);
};

module.exports.preprocess = require('./preprocess');
