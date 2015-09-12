'use strict';

var util = require('util'),
    Transform = require('stream').Transform;


function FlattenStream() {
  Transform.call(this, {
    objectMode: true
  });
  
  this._queue = [];
  this._streaming = false;
}
util.inherits(FlattenStream, Transform);


FlattenStream.prototype._transform = function (stream, enc, callback) {
  
  stream.on('error', this.emit.bind(this, 'error'));
  this._queue.push({
    stream: stream,
    cb: callback
  });
  if (!this._streaming) {
    this._processNextStream();
  }
};

FlattenStream.prototype._flush = function (callback) {
  this._queue.push({
    stream: null,
    cb: callback
  });
  if (!this._streaming) {
    this._processNextStream();
  }
};

FlattenStream.prototype._processNextStream = function () {
  if (this._queue.length <= 0) {
    return;
  }
  
  var next = this._queue.shift();
  if (next.stream === null) {
    this.push(null);
    next.cb(null);
  } else {
    this._streaming = true;
    next.stream
      .on('data', function (data) {
        this.push(data);
      }.bind(this))
      .on('end', function () {
        this._streaming = false;
        next.cb(null);
        this._processNextStream();
      }.bind(this));
  }
};


module.exports = function () {
  return new FlattenStream();
};
