/*global describe, it*/
'use strict';

var assert = require('chai').assert,
    //gutil = require('gulp-util'),
    builder = require('../lib/builder'),
    Block  = require('../lib/Block'),
    es = require('event-stream');


describe('builder', function () {

  it('should pass through blocks with unspecified target', function (done) {

    var blockStream = es.readArray([
      new Block({
        lines: [
          'a line',
          'another line'
        ]
      }),
      new Block({
        lines: [
          'yet another line'
        ]
      })
    ]);
    
    blockStream
      .pipe(builder.build({}))
      .pipe(es.wait(function (error, result) {
        assert.notOk(error);
        assert.strictEqual(result, [
          'a line',
          'another line',
          'yet another line'
        ].join('\n'));
        done();
      }));
  });

  it('should process blocks with target', function (done) {

    var blockStream = es.readArray([
      new Block({
        target: 'target1',
        indent: '  ',
        lines: [
          'a line',
          'another line'
        ],
        args: ['arg1', 'arg2']
      }),
      new Block({
        target: 'target2',
        lines: [
          'yet another line'
        ]
      })
    ]);
    
    blockStream
      .pipe(builder.build({
        target1: function (block) {
          assert.strictEqual(block.indent, '  ');
          assert.deepEqual(block.args, ['arg1', 'arg2']);
          
          var expected = [
            'a line',
            'another line'
          ];
          
          block
            .on('data', function (data) {
              assert.strictEqual(data, expected.shift());
            })
            .on('end', function () {
              assert.lengthOf(expected, 0);
              block.end('result of target 1');
            });
        },
        target2: function (block) {
          assert.deepEqual(block.args, []);
          var expected = [
            'yet another line'
          ];
          
          block
            .on('data', function (data) {
              assert.strictEqual(data, expected.shift());
            })
            .on('end', function () {
              assert.lengthOf(expected, 0);
              block.write('result 1 of target 2');
              block.end('result 2 of target 2');
            });
        }
      }))
      .pipe(es.wait(function (error, result) {
        assert.notOk(error);
        assert.strictEqual(result, [
          'result of target 1',
          'result 1 of target 2',
          'result 2 of target 2'
        ].join('\n'));
        done();
      }));
  });

  it('should allow synchronous build', function (done) {

    var blockStream = es.readArray([
      new Block({
        target: 'target',
        lines: [
          'a line'
        ]
      })
    ]);
    
    blockStream
      .pipe(builder.build({
        target: function (block) {
          block.end('build processed');
        }
      }))
      .pipe(es.wait(function (error, result) {
        assert.notOk(error);
        assert.strictEqual(result, [
          'build processed'
        ].join('\n'));
        done();
      }));
  });

  it('should allow synchronous build after non-build', function (done) {

    var blockStream = es.readArray([
      new Block({
        target: 'target1',
        lines: [
          'a line',
          'another line'
        ]
      }),
      new Block({
        target: 'target',
        lines: [
          'a line'
        ]
      })
    ]);
    
    blockStream
      .pipe(builder.build({
        target: function (block) {
          block.end('build processed');
        }
      }))
      .pipe(es.wait(function (error, result) {
        assert.notOk(error);
        assert.strictEqual(result, [
          'a line',
          'another line',
          'build processed'
        ].join('\n'));
        done();
      }));
  });


  
});