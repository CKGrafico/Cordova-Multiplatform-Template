/*global describe, it*/
'use strict';

var util   = require('util'),
    assert = require('chai').assert,
    expect = require('chai').expect,
    gutil = require('gulp-util'),
    parser = require('../lib/parser'),
    Block  = require('../lib/Block'),
    tutils = require('./testUtils');

var fixtures = [
  {
    line: '<!-- htmlbuild:js -->',
    expect: {
      type: parser._tokens.BLOCK_START,
      target: 'js',
      indent: ''
    }
  }, {
    line: '  <!--   htmlbuild:js   -->  ',
    expect: {
      type: parser._tokens.BLOCK_START,
      target: 'js',
      indent: '  '
    }
  }, {
    line: '<!-- htmlbuild:js arg1 -->',
    expect: {
        type: parser._tokens.BLOCK_START,
        target: 'js',
        indent: '',
        args: ['arg1']
    }
  }, {
    line: '<!-- htmlbuild:js arg1 arg2 -->',
    expect: {
        type: parser._tokens.BLOCK_START,
        target: 'js',
        indent: '',
        args: ['arg1', 'arg2']
    }
  }, {
    line: '<!-- htmlbuild:css -->',
    expect: {
      type: parser._tokens.BLOCK_START,
      target: 'css'
    }
  }, {
    line: '<!-- htmlbuild -->',
    expect: {
      type: parser._tokens.LINE,
      target: null
    }
  }, {
    line: '  <!--   endbuild   -->  ',
    expect: {
      type: parser._tokens.BLOCK_END
    }
  }
];


function assertBlock(expectedBlock, gotBlock) {
  assert.instanceOf(gotBlock, Block);
  for (var property in expectedBlock) {
    assert.property(gotBlock, property);

    var expectedVal = expectedBlock[property],
        gotVal      = expectedBlock[property];

    assert.deepEqual(expectedVal, gotVal);
  }
}

describe('parsing', function () {

  describe('tokenizer', function () {
    
    fixtures.forEach(function (fixture) {
      var spec = util.format(
        'should recognize "%s" as a %s', fixture.line, fixture.expect.type
      );
      
      it(spec, function () {
        var token = parser._tokenize(fixture.line);
        assert.strictEqual(fixture.line, token.line);
        for (var property in fixture.expect) {
          var value = fixture.expect[property];
            if (value && value.length) {
                expect(token[property]).deep.equal(value);
            } else {
                assert.propertyVal(token, property, value);
            }
        }
      });
    });
    
  });
  
  describe('parser', function () {
  
    it('shouldn\'t process a file with an unclosed block', function (done) {
      
      var fixture = new gutil.File({
        path: 'somePath',
        contents: new Buffer([
          'something',
          '<!-- htmlbuild:js -->',
          'something else'
        ].join('\n'))
      });
      
      parser.parse(fixture)
        .on('error', function (error) {
          tutils.assertError({
            lineNumber: 2,
            fileName: 'somePath'
          }, error);
          setImmediate(done);
        });
      
    });
    
    it('shouldn\'t process a file with unopened block', function (done) {
      
      var fixture = new gutil.File({
        path: 'somePath',
        contents: new Buffer([
          'something',
          '<!-- endbuild -->',
          'something else'
        ].join('\n'))
      });
      
      parser.parse(fixture)
        .on('error', function (error) {
          tutils.assertError({
            lineNumber: 2,
            fileName: 'somePath'
          }, error);
          setImmediate(done);
        });
      
    });
    
    it('shouldn\'t process a file with a block in a block', function (done) {
      
      var fixture = new gutil.File({
        path: 'somePath',
        contents: new Buffer([
          'something',
          '<!-- htmlbuild:js -->',
          '<!-- htmlbuild:js -->',
          'something else'
        ].join('\n'))
      });
      
      parser.parse(fixture)
        .on('error', function (error) {
          tutils.assertError({
            lineNumber: 3,
            fileName: 'somePath'
          }, error);
          setImmediate(done);
        });
      
    });
    
    it('should process a file with a proper block', function (done) {
      
      var fixture = new gutil.File({
        path: 'somePath',
        contents: new Buffer([
          'something',
          '  <!-- htmlbuild:js -->',
          'some content',
          '<!-- endbuild -->',
          'something else'
        ].join('\n'))
      });
      
      var expected = [
        {
          lineNumber: 1,
          lines: [
            'something'
          ]
        }, {
          target: 'js',
          indent: '  ',
          lineNumber: 2,
          lines: [
            'some content'
          ]
        }, {
          lineNumber: 5,
          lines: [
            'something else'
          ]
        }
      ];
      
      parser.parse(fixture)
        .on('error', done)
        .on('data', function (block) {
          assertBlock(expected.shift(), block);
        })
        .on('end', function () {
          assert.lengthOf(expected, 0);
          done();
        });

    });
    
  });
  
});