var proxy = require("proxy-stream")
    , WriteStream = require("write-stream")

module.exports = flatten

function flatten(stream) {
    return proxy(stream, transformation)

    function transformation(other, next, end) {
        other.pipe(WriteStream(next))
        other.on("end", end)
    }
}
