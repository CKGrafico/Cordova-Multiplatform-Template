var Stream = require("readable-stream")
    , Queue = require("read-stream/lib/queue")
    , extend = require("xtend")

ReadWriteStream.read = defaultRead
ReadWriteStream.write = defaultWrite
ReadWriteStream.end = defaultEnd

module.exports = ReadWriteStream

function ReadWriteStream(write, end, read, state) {
    if (typeof write !== "function" && write) {
        state = write
        write = end = read = null
    } else if (typeof end !== "function" && end) {
        state = end
        end = read = null
    } else if (typeof read !== "function" && read) {
        state = read
        read = null
    }

    write = write || defaultWrite
    end = end || defaultEnd
    read = read || defaultRead

    var ended = false
        , stream = new Stream()
        , queue = Queue(stream)

    stream.writable = true

    queue.stream = stream

    extend(queue, state || {})

    stream.write = handleWrite
    stream.end = handleEnd
    stream.read = handleRead

    return queue

    function handleWrite(chunk) {
        var result = write.call(stream, chunk, queue)
        return result === false ? false : true
    }

    function handleEnd(chunk) {
        if (ended) {
            return
        }

        ended = true
        if (arguments.length) {
            stream.write(chunk)
        }

        end.call(stream, queue)
    }

    function handleRead(bytes) {
        var result = read.call(stream, bytes, queue)

        return result === undefined ? null : result
    }
}

function defaultWrite(data, queue) {
    queue.push(data)
}

function defaultEnd(queue) {
    queue.end()
    this.emit("finish")
}

function defaultRead(bytes, queue) {
    return queue.shift()
}
