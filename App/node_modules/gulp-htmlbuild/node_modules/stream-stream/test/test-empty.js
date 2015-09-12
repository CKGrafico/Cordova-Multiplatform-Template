var SS = require('../');
var sink = require('stream-sink');


exports.testEmpty = function(test) {
    var ss = SS();
    var finished = false;
    ss.pipe(sink()).on('data', function(data) {
        test.equal(data, '', "There should be no data");
        finished = true;
        clearTimeout(to);
        test.done();
    });

    var to = setTimeout(function() {
        if(!finished) {
            test.fail('No end detected');
            test.done();
        }
    }, 10);

    ss.end();
}
