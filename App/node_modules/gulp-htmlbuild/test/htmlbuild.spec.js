/*global describe, it*/
'use strict';

var tutils = require('./testUtils'),
    es = require('event-stream'),
    htmlbuild = require('../lib'),
    assert = require('chai').assert;

describe('htmlbuild', function () {

  it('should error on stream', function (done) {

    var srcFile = tutils.getFixture('single-script-block.html', { stream: true });
    
    tutils.runTest({
      expectedErr : {
        fileName: srcFile.path
      },
      srcFile     : srcFile,
      options     : { }
    }, done);
    
  });

  it('should process html with no blocks defined', function (done) {
    
    tutils.runTest({
      expectedFile : tutils.getExpected('no-blocks.html'),
      srcFile      : tutils.getFixture('no-blocks.html'),
      options      : { }
    }, done);
    
  });

  it('should process html with blocks passed through', function (done) {
    
    tutils.runTest({
      expectedFile : tutils.getExpected('single-script-block-no-replace.html'),
      srcFile      : tutils.getFixture('single-script-block.html'),
      options      : {
        js: function (block) {
          block.pipe(block);
        }
      }
    }, done);
    
  });

  it('should process html with replace', function (done) {
    
    tutils.runTest({
      expectedFile : tutils.getExpected('single-script-block-with-replace.html'),
      srcFile      : tutils.getFixture('single-script-block.html'),
      options      : {
        js: function (block) {
          block.end('  <script src="replace"></script>');
        }
      }
    }, done);
    
  });

  it('should process html with js preprocessor', function (done) {
    
    tutils.runTest({
      expectedFile : tutils.getExpected('single-script-block-with-replace.html'),
      srcFile      : tutils.getFixture('single-script-block.html'),
      options      : {
        js: htmlbuild.preprocess.js(function (block) {
          block.pipe(es.writeArray(function (error, srcs) {
            assert.notOk(error);
            assert.deepEqual(srcs, [
              'src1',
              'src2',
              'src3'
            ]);
            block.end('replace');
          }));
        })
      }
    }, done);
    
  });
  
});
