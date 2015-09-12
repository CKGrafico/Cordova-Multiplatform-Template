'use strict';

var es = require('event-stream'),
    preprocessUtil = require('./preprocessUtil'),
    util = require('util');

module.exports = function (buildFn) {

  function extractScript(line) {
    var matched = /(\s*)<script.+src=['"]([^"']+)["']/.exec(line);
    if (matched) {
      return preprocessUtil.pathFromUrl(matched[2]);
    }
  }

  return function (block) {

    function templateScript(path) {
      var template = block.indent + '<script src="%s"></script>';
      return util.format(template, path);
    }


    var extractSrc = es.mapSync(extractScript),
        templateSrc = es.mapSync(templateScript);


    block.pipe(extractSrc);
    templateSrc.pipe(block);

    buildFn(es.duplex(templateSrc, extractSrc));
  };
};
