var util = require('util');
var stream = require('stream');
var SS = require('../');
var sink = require('stream-sink');

function EmitStream (array) {
    stream.Readable.call(this, {objectMode:true});
    this._source = array.slice();
}
util.inherits(EmitStream, stream.Readable);
EmitStream.prototype._read = function(size) {
    var chunk = this._source.shift();
    if(!chunk) return this.push(null);

    var s = new stream.PassThrough();
    s.name = chunk;
    process.nextTick(function() {
        s.end(chunk);
    });
    this.push(s);
}

exports.testStreamSeparator = function(test) {
    var emitter = new EmitStream(['one', 'two', 'three']);
    var ss = SS({separator: ':'});
    var s = sink();
    var done = false;
    var to = setTimeout(function() {
        if(!done) {
            test.fail('No end detected')
            test.done();
        }
    }, 500);

    emitter.pipe(ss).pipe(s).on('data', function(data) {
        test.equal(data, "one:two:three", "Data in sink should be identical");
        done = true;
        test.done();
        clearTimeout(to);
    });

}

exports.testStreamSeparatorWhenWritingAsync = function(test) {
    var emitter = new EmitStream(['one', 'two', 'three']);
    var ss = SS({separator: ':'});
    var s = sink();
    var done = false;
    var to = setTimeout(function() {
        if(!done) {
            test.fail('No end detected')
            test.done();
        }
    }, 500);

    emitter.pipe(ss, {end: false}).pipe(s).on('data', function(data) {
        test.equal(data, "one:two:three:four", "Data in sink should be identical");
        done = true;
        test.done();
        clearTimeout(to);
    });
    emitter.on('end', function() {
        var async = stream.PassThrough();
        setTimeout(function() {
            ss.end(async);
            process.nextTick(function() {
                async.end('four');
            });
        }, 100);
    });
}

exports.testSeparatorIsFunction = function(test) {
    var emitter = new EmitStream(['one', 'two', 'three']);
    var ss = SS({separator: function(cb) {
        process.nextTick(function() {
            cb(':');
        })
    }});
    var s = sink();
    var done = false;
    var to = setTimeout(function() {
        if(!done) {
            test.fail('No end detected')
            test.done();
        }
    }, 500);

    emitter.pipe(ss).pipe(s).on('data', function(data) {
        test.equal(data, "one:two:three", "Data in sink should be identical");
        done = true;
        test.done();
        clearTimeout(to);
    });
}

exports.testSeparatorReturnsStream = function(test) {
    var emitter = new EmitStream(['one', 'two', 'three']);
    var ss = SS({separator: function(cb) {
        var mystream = new stream.PassThrough();
        process.nextTick(function() {
            cb(mystream);
        });
        process.nextTick(function() {
            mystream.end(':')
        })
    }});
    var s = sink();
    var done = false;
    var to = setTimeout(function() {
        if(!done) {
            test.fail('No end detected')
            test.done();
        }
    }, 500);

    emitter.pipe(ss).pipe(s).on('data', function(data) {
        test.equal(data, "one:two:three", "Data in sink should be identical");
        done = true;
        test.done();
        clearTimeout(to);
    });
}

