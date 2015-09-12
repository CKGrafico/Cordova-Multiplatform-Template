'use strict';

var es = require('event-stream'),
    preprocessUtil = require('./preprocessUtil'),
    util = require('util');

module.exports = function (buildFn) {

  function extractCss(line) {
    var matched = /(\s*)<link.+href=['"]([^"']+)["']/.exec(line);
    if (matched) {
      return preprocessUtil.pathFromUrl(matched[2]);
    }
  }

  return function (block) {

    function templateCss(path) {
      var template = block.indent + '<link rel="stylesheet" href="%s"/>';
      return util.format(template, path);
    }


    var extractCssStream = es.mapSync(extractCss),
        templateCssStream = es.mapSync(templateCss);


    block.pipe(extractCssStream);
    templateCssStream.pipe(block);

    buildFn(es.duplex(templateCssStream, extractCssStream));
  };
};
