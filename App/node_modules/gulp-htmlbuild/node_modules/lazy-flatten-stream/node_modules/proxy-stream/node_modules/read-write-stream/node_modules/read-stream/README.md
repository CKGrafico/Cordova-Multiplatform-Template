# read-stream

Base class for readable streams

## Example queue

```js
var ReadStream = require("read-stream")
    , queue = ReadStream()
    , count = 0

var timer = setInterval(function () {
    count = ++count

    if (count < 5) {
        queue.push(count.toString())
    } else {
        clearInterval(timer)
        queue.end()
    }
}, 500)

queue.stream.pipe(process.stdout)
```

## Example array

```js
var fromArray = require("read-stream").fromArray
    , stream = fromArray(["one", "two"])

stream.pipe(process.stdout)
```

## Example from

```js
var from = require("read-stream/from")

var stream = from(function (push, end) {
    var cursor = db.cursor(...)

    cursor.each(function (err, item) {
        if (err) {
            return end(err)
        }

        // This cursor eventually has item === null.
        // push(null) is the same as end() so it ends the
        // stream cleanly.
        push(item)
    })
})

stream.pipe(process.stdout)
```

## Example callback

```js
var callback = require("read-stream/callback")

var stream = callback(function (cb) {
    fs.readFile(someUri, cb)
})

stream.pipe(process.stdout)
```

## Example function (old)

```
var ReadStream = require("read-stream")
    // state is a shared object among all reads whose initial
    // value is set to be  { count: 0 }
    , stream = ReadStream(function read(bytes, queue) {
        var count = ++queue.count

        if (count < 5) {
            return count.toString()
        }

        queue.end()
    }, { count: 0 }).stream

stream.pipe(process.stdout)
```


## Installation

`npm install read-stream`

## Contributors

 - Raynos

## MIT Licenced
