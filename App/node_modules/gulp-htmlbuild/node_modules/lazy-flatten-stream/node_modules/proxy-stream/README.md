# proxy-stream

Create a wrapped stream

## Example

``` js
var proxy = require("proxy-stream")
    , WriteStream = require("write-stream")

function map(stream, iterator) {
    return proxy(stream, function transformation(chunk, next) {
        next(iterator(chunk))
    })
}

function mapConcat(stream, iterator) {
    return proxy(stream, function transformation(chunk, next) {
        var list = iterator(chunk)
        list.forEach(function (item) {
            next(item)
        })
    })
}

function filter(stream, predicate) {
    return proxy(stream, function transformation(chunk, next) {
        var keep = predicate(chunk)
        if (keep) {
            next(chunk)
        }
    })
}

function reductions(stream, iterator, initial) {
    return proxy(stream, function transformation (chunk, next) {
        initial = iterator(initial, chunk)
        next(initial)
    })
}

function flatten(stream) {
    var proxied = proxy(stream, function transformation(other, next, end) {
        other.pipe(WriteStream(next))
        other.on("end", end)
        other.on("error", function (err) {
            proxied.emit("error", err)
        })
    })

    return proxied
}

function mapAsync(stream, iterator) {
    var proxied = proxy(stream, function transformation(chunk, next, end) {
        iterator(chunk, function (err, value) {
            if (err) {
                return proxied.emit("error", err)
            }

            next(value)
            end()
        })
    })

    return proxied
}
```

Proxy stream is used to create a new stream based on another stream.

It's mainly used as a building block for reduce / map / filter

## Installation

`npm install proxy-stream`

## Contributors

 - Raynos

## MIT Licenced
