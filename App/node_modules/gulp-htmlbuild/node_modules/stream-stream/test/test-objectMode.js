var stream = require('stream');
var SS = require('../');
var sink = require('stream-sink');

exports.testObjectMode = function(test) {
    var options = {objectMode: true};
    var a = new stream.PassThrough(options);
    var b = new stream.PassThrough(options);
    var c = new stream.PassThrough(options);
    var ss = SS(options)
    var done = false;
    ss.pipe(sink(options)).on('data', function(data) {
        done = true;
        clearTimeout(to);
        test.doesNotThrow(function() {
            test.ok(Array.isArray(data), "Data should be an array");
            test.equal(data.length, 3, "Data should have same length");
            test.equal(data.join(''), 'abc', 'Data should be abc')
        })
        test.done();
    });

    ss.write(a);
    a.end('a');
    b.end('b');
    ss.write(b);
    ss.end(c);
    c.end('c');
    
    var to = setTimeout(function(){
        if(!done) {
            test.fail('no end detected');
            test.done();
        }
    }, 20)
}

exports.testobjectModeAsync = function(test) {
    var options = {objectMode: true};
    var a = new stream.PassThrough(options);
    var b = new stream.PassThrough(options);
    var c = new stream.PassThrough(options);
    var ss = SS(options)
    var done = false;
    ss.pipe(sink(options)).on('data', function(data) {
        done = true;
        clearTimeout(to);
        test.doesNotThrow(function() {
            test.ok(Array.isArray(data), "Data should be an array");
            test.equal(data.length, 3, "Data should have same length");
            test.equal(data.join(''), 'abc', 'Data should be abc')
        })
        test.done();
    });

    ss.write(a);
    ss.write(b);

    setTimeout(function() {
        a.write('a');
    }, 10)
    setTimeout(function() {
        b.write('b');
    }, 20);
    setTimeout(function() {
        a.end();
    }, 30);
    setTimeout(function() {
        b.end();
    }, 40)
    setTimeout(function() {
        ss.end(c);
    }, 50)
    setTimeout(function() {
        c.end('c');
    })
    
    var to = setTimeout(function(){
        if(!done) {
            test.fail('no end detected');
            test.done();
        }
    }, 1000)
}

exports.testObjectModeOverrun = function (test) {
    var options = {objectMode: true};
    var a = new stream.PassThrough(options);
    var b = new stream.PassThrough(options);
    var c = new stream.PassThrough(options);
    var ss = SS(options)
    var done = false;
    ss.pipe(sink(options)).on('data', function(data) {
        done = true;
        clearTimeout(to);
        test.doesNotThrow(function() {
            test.ok(Array.isArray(data), "Data should be an array");
            test.equal(data.length, 6, "Data should have same length");
            test.equal(data.join(''), 'aabbcc', 'Data should be aabbcc')
        })
        test.done();
    });

    a.write('a');
    ss.write(a);
    a.end('a');
    b.write('b');
    b.end('b');
    ss.write(b);
    ss.end(c);
    c.write('c');
    c.end('c');
    
    var to = setTimeout(function(){
        if(!done) {
            test.fail('no end detected');
            test.done();
        }
    }, 20)
}
