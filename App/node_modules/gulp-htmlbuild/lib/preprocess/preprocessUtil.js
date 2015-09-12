'use strict';

var urlUtil = require('url');

function pathFromUrl(url) {
  var parsed = urlUtil.parse(url);
  return urlUtil.format({
    protocol: parsed.protocol,
    hostname: parsed.hostname,
    port: parsed.port,
    pathname: parsed.pathname
  });
}

exports.pathFromUrl = pathFromUrl;
