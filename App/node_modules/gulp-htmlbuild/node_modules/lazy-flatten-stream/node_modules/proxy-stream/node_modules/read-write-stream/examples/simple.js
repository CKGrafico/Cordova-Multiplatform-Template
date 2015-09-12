var through = require("../index")
    , input = through().stream
    , output = through(function write(chunk) {
        console.log("chunk", chunk)
    }).stream
    , transform = through(write, through.defaultEnd, read).stream

input.pipe(transform)
transform.pipe(output)

input.write(1)
input.write(2)
input.write(3)

var to = require("write-stream").toArray
    , from = require("read-stream").fromArray
    , intern = through(write).stream
    , list = []

intern.pipe(to(list, function () {
    console.log("list", list)
}))
from([1,2,3,4]).pipe(intern)

function write(chunk, queue) {
    queue.push(chunk * 2)
}

function read(bytes, queue) {
    var chunk = queue.shift()
    return chunk * 2
}

var through = require("../index")
    , transform = through(function write(chunk, queue) {
        queue.push(chunk * chunk)
    }).stream
    , to = require("write-stream").toArray
    , from = require("read-stream").fromArray

from([1,2,3]).pipe(transform).pipe(to([], function end(list) {
    console.log("transformed", list); // [1, 4, 9]
}))

var axon = require("axon")
    , pub = axon.socket("push")
    , sub = axon.socket("pull")
    , duplex = require("../index")
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

pub.bind(3000, function () {
    sub.connect(3000, function () {
        from(["foo", "bar", "baz"])
            .pipe(queue.stream)
            .pipe(to([], function (list) {
                console.log("list from sub", list)
            }))
    })
})

