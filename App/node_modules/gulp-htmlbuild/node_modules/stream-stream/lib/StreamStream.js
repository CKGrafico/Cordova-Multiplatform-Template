var util = require('util');
var stream = require('stream');
var Readable = stream.Readable;

function StreamStream (options) {
    // use without new
    if(!(this instanceof StreamStream)) return new StreamStream(options);

    // super
    stream.Transform.call(this, options);
    options = options || {};

    var separator = options.separator;
    switch(typeof separator) {
        // if the separator is a constant value
        // we make it a function to be treated in the
        // next case
        case 'string':
            var val = separator;
            separator = function(cb) {
                process.nextTick(function() {
                    cb(val);
                })
            }
        // make this._separator() always return
        // a stream filled with the results of the callback
        // if the reset is a stream, pipe it as separator
        case 'function':
            var fn = separator;
            separator = function() {
                var ps = new stream.PassThrough(options);
                ps._isSeparator = true;
                fn(function(res) {
                    if(res.readable)
                        res.pipe(ps);
                    else 
                        ps.end(res);
                });
                return ps;
            }
            break;
        default:
            separator = null;
            break;
    }
    this._separator = separator;

    this._readableState.objectMode = options.objectMode;
    this._writableState.objectMode = true;
}
util.inherits(StreamStream, stream.Transform);

StreamStream.prototype._transform = function _transform(stream, encoding, done) {
    if(this._lastStream && this._separator && this._needSeparator) {
        var withSep = new StreamStream(this._readableState.objectMode);
        withSep.write(this._separator());
        withSep.end(stream);
        stream = withSep;
    }

    if(!(stream instanceof Readable)) {
      var readable = new Readable({objectMode: true});
      stream = readable.wrap(stream);
    }

    var self = this;
    function onData (data) {
      // TODO pause stream on overrun
      self.push(data);
    }
    stream.on('data', onData);
    stream.on('end', function () {
      stream.removeListener('data', onData);
      done();
    });
    this._needSeparator = true;
    this._lastStream = stream;
};

module.exports = StreamStream;
