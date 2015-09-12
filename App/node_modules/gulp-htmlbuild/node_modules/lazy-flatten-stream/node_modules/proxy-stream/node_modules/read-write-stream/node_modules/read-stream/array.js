var ReadStream = require("./index")

module.exports = fromArray

function fromArray(array) {
    var queue = ReadStream(readArray)
        , stream = queue.stream

    return stream

    function readArray(bytes) {
        if (array.length > 0) {
            return array.shift()
        } else if (array.length === 0) {
            process.nextTick(end)
            return null
        }
    }

    function end() {
        stream.emit("end")
    }
}
