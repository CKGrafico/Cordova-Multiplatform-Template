var ReadWriteStream = require("./index.js")
    , reemit = require("re-emitter").reemit

module.exports = wrap

function wrap(stream) {
    var queue = ReadWriteStream(stream.write, end)
        , result = queue.stream

    stream.on("end", queue.end)

    stream.on("data", queue.push)

    reemit(stream, result, ["error", "drain"])

    return result

    function end() {
        stream.end()
        process.nextTick(finish)
    }

    function finish() {
        result.emit("finish")
    }
}
