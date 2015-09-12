[![Build Status](https://travis-ci.org/Floby/node-stream-stream.png?branch=master)](https://travis-ci.org/Floby/node-stream-stream)

node-stream-stream
==================

> A stream of streams in order to concatenate the contents of several streams

Installation
------------

    npm install --save stream-stream

Usage
-----

A StreamStream is a special kind of transform stream to which you write readable streams.
The contents of the readable streams will be concatenated in the order you wrote them.

```javascript
var ss = require('stream-stream');
var fs = require('fs');

var files = ['a.txt', 'b.txt', 'c.txt'];
var stream = ss();

files.forEach(function(f) {
    stream.write(fs.createReadStream(f));
});
stream.end();

stream.pipe(process.stdout);
```

You can also add a separator between the contents of each stream by specifying a `separator`
field in the options.

```javascript
var mystream = new ss({
    separator: '\n',

    // if separator is a function, it will get called
    // everytime the stream needs to insert a separator
    separator: function(cb) {
        cb('\n');
    },
    separator: function(cb) {
        cb(someReadableStream)
    }
});
```

It is also possible to `pipe()` to this stream from a readable stream in objectMode.


Test
----

You can run the tests with `npm test`. You will need [nodeunit](https://github.com/caolan/nodeunit)

Contributing
------------

Anyone is welcome to submit issues and pull requests

thanks to [vanthome](https://github.com/vanthome)


License
-------

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2012 Florent Jaby

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
