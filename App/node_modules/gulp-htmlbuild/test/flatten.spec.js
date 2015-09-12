/*global describe, it*/

'use strict';

var assert = require('chai').assert,
    flatten = require('../lib/flatten'),
    es = require('event-stream'),
    PassThrough = require('stream').PassThrough,
    buffer = require('pause-stream');


describe('flatten', function () {

  it('should flatten a stream', function (done) {


    var streamOfStreams = new PassThrough({objectMode: true});

    streamOfStreams
      .pipe(flatten())
      .pipe(es.wait(function (err, result) {
        assert.notOk(err);
        assert.strictEqual(String(result), '12345678');
        done();
      }));

    var stream1 = new PassThrough();
    streamOfStreams.write(stream1);
    stream1.write('1');
    stream1.write('2');
    stream1.write('3');
    stream1.end();
    var stream2 = new PassThrough();
    streamOfStreams.write(stream2);
    stream2.write('4');
    stream2.write('5');
    stream2.write('6');
    stream2.end();
    var stream3 = new PassThrough();
    streamOfStreams.write(stream3);
    stream3.write('7');
    stream3.write('8');
    stream3.end();
    streamOfStreams.end();

  });


});
