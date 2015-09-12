'use strict';

var fs = require('fs'),
    path = require('path'),
    assert = require('chai').assert,
    gutil = require('gulp-util'),
    htmlbuild = require('../');

  
var CWD             = 'test',
    EXPECTED_FOLDER = 'expected',
    FIXTURES_FOLDER = 'fixtures';

var PLUGIN_NAME = require('../package').name;

function getExpected(file) {
  var base     = path.join(CWD, EXPECTED_FOLDER),
      filePath = path.join(base, file);
  
  return new gutil.File({
    path    : filePath,
    cwd     : CWD,
    base    : base,
    contents: new Buffer(fs.readFileSync(filePath))
  });
}

function getFixture(file, options) {
  var base     = path.join(CWD, FIXTURES_FOLDER),
      filePath = path.join(base, file),
      contents = null;
  
  options = options || {};
  
  if (options.stream) {
    contents = fs.createReadStream(filePath);
  } else {
    contents = new Buffer(fs.readFileSync(filePath));
  }
  
  return new gutil.File({
    path    : filePath,
    cwd     : CWD,
    base    : base,
    contents: contents
  });
}

function mockConcatBuilder() {
  return function (files, callback) {
    assert.isDefined(files);
    assert.isArray(files);
    
    setImmediate(function () {
      callback(null, [files.join('-')]);
    });
  };
}

function assertError(expected, got) {
  assert.instanceOf(got, gutil.PluginError);
  assert.propertyVal(got, 'plugin', PLUGIN_NAME);

  for (var property in expected) {
    var val = expected[property];
    assert.propertyVal(got, property, val);
  }
}


function runTest(options, done) {
  var stream    = htmlbuild(options.options),
      expectErr = options.expectedErr;

  stream.on('error', function (error) {
    if (options.expectedErr) {
      if (!(options.expectedErr instanceof Object)) {
        expectErr = {};
      }
      assertError(expectErr, error);
      done();
    } else {
      done(error);
    }
  });

  stream.on('data', function (newFile) {
    if (options.expectedErr) {
      assert.fail();
    } else {
      assert.isDefined(newFile);
      assert.isDefined(newFile.contents);
      assert.strictEqual(
        String(newFile.contents),
        String(options.expectedFile.contents)
      );
      done();
    }
  });

  stream.write(options.srcFile);
  stream.end();
}


module.exports = {
  getExpected: getExpected,
  getFixture: getFixture,
  mockConcatBuilder: mockConcatBuilder,
  runTest: runTest,
  assertError: assertError
};

