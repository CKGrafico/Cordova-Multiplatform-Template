var stream = require('stream');
var SS = require('../');
var sink = require('stream-sink');
var EventEmitter = require('events').EventEmitter;

exports.testOldStream = function(test) {
    var data = new EventEmitter();
    var ss = SS()
    var done = false;
    ss.pipe(sink()).on('data', function(data) {
        done = true;
        clearTimeout(to);
        test.equal('hello', data, "Data in sink should be identical");
        test.done();
    });

    ss.end(data);

    data.emit('data', 'hello');
    data.emit('end');
    
    var to = setTimeout(function(){
        if(!done) {
            test.fail('no end detected');
            test.done();
        }
    }, 20)
}

