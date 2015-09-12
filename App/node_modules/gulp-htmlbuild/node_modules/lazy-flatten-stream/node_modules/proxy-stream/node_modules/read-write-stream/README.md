# read-write-stream

Base stream class for through RW stream

## Example through

``` js
var through = require("read-write-stream")
    , transform = through(function write(chunk, queue) {
        queue.push(chunk * chunk)
    }).stream
    , to = require("write-stream").toArray
    , from = require("read-stream").fromArray

from([1,2,3]).pipe(transform).pipe(to([], function end(list) {
    console.log(list); // [1, 4, 9]
}))
```

## Example duplex

``` js
var axon = require("axon")
    , pub = axon.socket("push")
    , sub = axon.socket("pull")
    , duplex = require("read-write-stream")
    , from = require("read-stream").fromArray
    , to = require("write-stream").toArray

// Writable end of duplex
var queue = duplex(function write(chunk) {
    pub.send(chunk)
}, function end() {
    pub.send("__GOODBYE__")
    setTimeout(pub.close.bind(pub), 1000)
})

// Readable end of duplex
sub.on("message", function (chunk) {
    chunk = chunk.toString()
    if (chunk === "__GOODBYE__") {
        queue.end()
        sub.close()
    } else {
        queue.push(chunk)
    }
})

// Open underlying writable data source
pub.bind(3000, function () {
    // Open underlying readable data source
    sub.connect(3000, function () {
        // flow data from array
        from(["foo", "bar", "baz"])
            // into duplex
            .pipe(queue.stream)
            // into array
            .pipe(to([], function (list) {
                console.log("list from sub", list)
            }))
    })
})
```

## Installation

`npm install read-write-stream`

## Contributors

 - Raynos

## MIT Licenced
