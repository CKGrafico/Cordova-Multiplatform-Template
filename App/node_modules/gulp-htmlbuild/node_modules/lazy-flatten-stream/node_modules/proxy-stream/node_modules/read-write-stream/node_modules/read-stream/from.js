var ReadStream = require("./index")

module.exports = from

function from(generator) {
    var queue = ReadStream()
        , stream = queue.stream

    generator.call(queue, queue.push, end)

    return stream

    function end(err, result) {
        if (err) {
            return stream.emit("error", err)
        }

        if (arguments.length === 2) {
            queue.push(result)
        }

        queue.end()
    }
}
