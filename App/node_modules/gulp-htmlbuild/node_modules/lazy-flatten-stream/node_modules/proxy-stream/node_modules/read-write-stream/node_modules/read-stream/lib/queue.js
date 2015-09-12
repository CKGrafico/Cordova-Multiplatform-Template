module.exports = Queue

function Queue(stream) {
    var ended = false
        , array = []
        , queue = {
            shift: shift
            , push: push
            , end: end
            , error: error
            , length: 0
        }

    return queue

    function shift() {
        var chunk = array.shift()
        if (ended && array.length === 0) {
            process.nextTick(emitEnd)
        }
        queue.length = array.length
        return chunk
    }

    function push(chunk) {
        if (chunk === null) {
            return end()
        }

        array.push(chunk)
        if (array.length === 1) {
            stream.emit("readable")
        }

        queue.length = array.length
    }

    function end(chunk) {
        if (ended) {
            return
        }

        ended = true

        if (arguments.length) {
            push(chunk)
        }

        if (array.length === 0) {
            process.nextTick(emitEnd)
        }
    }

    function error(err) {
        stream.emit("error", err)
    }

    function emitEnd() {
        stream.emit("end")
    }
}
