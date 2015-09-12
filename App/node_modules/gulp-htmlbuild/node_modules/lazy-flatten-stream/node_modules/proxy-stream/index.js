var ReadWriteStream = require("read-write-stream")
    , reemit = require("re-emitter").reemit

module.exports = proxy

function proxy(stream, transformation) {
    var proxied = ReadWriteStream(write, writeEnd, read).stream
        , writeEndCount = 0
        , readEndCount = 0
        , readEnded = false
        , writeEnded = false
        , pipeStream

    proxied.pipe = handlePipe

    reemit(stream, proxied, ["readable", "drain", "error"])

    stream.on("end", readEnd)

    return proxied

    function write(chunk, queue) {
        if (transformation.length === 3) {
            writeEndCount++
            return transformation.call(proxied, chunk, stream.write
                , decrementWriteCount)
        } else {
            return transformation.call(proxied, chunk, stream.write)
        }
    }

    function read(bytes, queue) {
        var chunk = stream.read()
        if (chunk === null) {
            return null
        }

        if (transformation.length === 3) {
            readEndCount++
            transformation.call(proxied, chunk, queue.push, decrementReadCount)
        } else {
            transformation.call(proxied, chunk, queue.push)
        }

        if (queue.length === 0) {
            return read(bytes, queue)
        }
        return queue.shift()
    }

    function decrementWriteCount() {
        writeEndCount--
        if (writeEnded && writeEndCount === 0) {
            stream.end()
        }
    }

    function decrementReadCount() {
        readEndCount--
        if (readEnded && readEndCount === 0) {
            proxied.emit("end")
        }
    }

    function writeEnd() {
        writeEnded = true
        if (writeEndCount === 0) {
            stream.end()
        }
    }

    function readEnd() {
        readEnded = true
        if (readEndCount === 0) {
            proxied.emit("end")
        }
    }

    function handlePipe(dest) {
        var endCount = 0
            , ended = false

        if (!pipeStream) {
            pipeStream = ReadWriteStream(pipeWrite, pipeEnd).stream
            stream.pipe(pipeStream)
        }

        return pipeStream.pipe(dest)

        function pipeWrite(chunk, queue) {
            if (transformation.length === 3) {
                endCount++
                return transformation.call(proxied, chunk, queue.push
                    , decrementCount)
            } else {
                return transformation.call(proxied, chunk, queue.push)
            }
        }

        function decrementCount() {
            endCount--
            if (ended && endCount === 0) {
                pipeStream.emit("end")
            }
        }

        function pipeEnd() {
            ended = true
            if (endCount === 0) {
                pipeStream.emit("end")
            }
        }
    }
}
