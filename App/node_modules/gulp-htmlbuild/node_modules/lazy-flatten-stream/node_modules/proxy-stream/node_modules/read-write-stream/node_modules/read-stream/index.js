var Stream = require("readable-stream")
    , extend = require("xtend")
    , Queue = require("./lib/queue")

ReadStream.read = defaultRead

module.exports = ReadStream

ReadStream.from = require("./from")
ReadStream.callback = require("./callback")
ReadStream.fromArray = require("./array")

function ReadStream(read, state) {
    read = read || defaultRead

    var stream = new Stream()
        , queue = Queue(stream)

    extend(queue, state || {})

    stream.read = handleRead
    queue.stream = stream

    return queue

    function handleRead(bytes) {
        var result = read.call(stream, bytes, queue)

        return result === undefined ? null : result
    }
}

function defaultRead(bytes, queue) {
    return queue.shift()
}
