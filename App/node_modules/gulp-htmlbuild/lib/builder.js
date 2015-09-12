'use strict';

var es = require('event-stream'),
    Duplex = require('stream').Duplex,
    flatten = require('./flatten'),
    util = require('util');




function QueueStream() {
  Duplex.call(this, {
    objectMode: true
  });
  
  this._flowing = false;
  this._queue = [];
  
  this.on('finish', function () {
    this._enqueue(null);
  }.bind(this));
}
util.inherits(QueueStream, Duplex);

QueueStream.prototype._read = function () {
  this._flowing = true;
  this._streamData();
};

QueueStream.prototype._write = function (chunk, enc, callback) {
  this._enqueue(chunk);
  callback(null);
};

QueueStream.prototype._enqueue = function (data) {
  this._queue.push(data);
  if (this._flowing) {
    this._streamData();
  }
};

QueueStream.prototype._streamData = function () {
  while (this._flowing && this._queue.length > 0) {
    var data = this._queue.shift();
    this._flowing = this.push(data);
  }
};



function BlockStream(block) {
  Duplex.call(this, {
    objectMode: true,
    allowHalfOpen: true
  });
  
  this.indent = block.indent;
  this.args = block.args;
  
  this._lines = block.lines.map(function (line) {
    return line;
  });
  
  this.result = new QueueStream();
  this.on('finish', function () {
    this.result.end();
  }.bind(this));
}
util.inherits(BlockStream, Duplex);

BlockStream.prototype._read = function () {
  var accepts = true;
  while (accepts && this._lines.length > 0) {
    var line = this._lines.shift();
    accepts = this.push(line);
  }
  
  if (this._lines.length <= 0) {
    this.push(null);
  }
};

BlockStream.prototype._write = function (chunk, enc, callback) {
  this.result.write(chunk);
  callback(null);
};



function build(config) {
  config = config || {};
  
  var buildStream = es.through(function write(block) {
    var buildFn = block.target && config[block.target],
        blockStream = new BlockStream(block);
    
    if (buildFn) {
      buildFn(blockStream);
    } else {
      blockStream.pipe(blockStream);
    }
    
    this.queue(blockStream.result);
  });
  
  return es.pipeline(
    buildStream,
    flatten(),
    es.join('\n')
  );
}


module.exports = {
  build: build
};
