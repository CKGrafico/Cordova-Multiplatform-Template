/*global describe, it*/

'use strict';

var assert = require('chai').assert,
    es = require('event-stream'),
    preprocess = require('../lib/preprocess');


describe('preprocess', function () {

  describe('js', function () {

    it('should preprocess javascript', function (done) {

      var preprocessor = preprocess.js(function (block) {
        block.pipe(es.writeArray(function (error, sources) {
          assert.notOk(error);
          assert.deepEqual(sources, [
            'the-src',
            'the-other-src',
            'the-src-with'
          ]);
          block.write('result-1');
          block.end('result-2');
        }));
      });

      var input = es.readArray([
        '  <script src="the-src"></script>',
        'not a script',
        '<script type="text/javascript" src="the-other-src"></script>',
        '<script src="the-src-with?query=string"></script>'
      ]);
      var output = es.through();
      output.pipe(es.writeArray(function (error, result) {
        assert.notOk(error);
        assert.deepEqual(result, [
          '  <script src="result-1"></script>',
          '  <script src="result-2"></script>'
        ]);
        done();
      }));

      var blockStream = es.duplex(output, input);
      blockStream.indent = '  ';

      preprocessor(blockStream);

    });

  });

  describe('css', function () {

    it('should preprocess css', function (done) {

      var preprocessor = preprocess.css(function (block) {
        block.pipe(es.writeArray(function (error, sources) {
          assert.notOk(error);
          assert.deepEqual(sources, [
            'the-src',
            'the-other-src',
            './the-src-with'
          ]);
          block.write('result-1');
          block.end('result-2');
        }));
      });

      var input = es.readArray([
        '  <link href="the-src"/>',
        'not a stylesheet',
        '<link rel="stylesheet" href="the-other-src"/>',
        '<link rel="stylesheet" href="./the-src-with?query=string"/>'
      ]);
      var output = es.through();
      output.pipe(es.writeArray(function (error, result) {
        assert.notOk(error);
        assert.deepEqual(result, [
          '  <link rel="stylesheet" href="result-1"/>',
          '  <link rel="stylesheet" href="result-2"/>'
        ]);
        done();
      }));

      var blockStream = es.duplex(output, input);
      blockStream.indent = '  ';

      preprocessor(blockStream);

    });

  });


});
