var from = require("read-stream").fromArray
    , to = require("write-stream").toArray
    , flatten = require("..")
    , map = require("lazy-map-stream")
    , assert = require("assert")

// expand(stream, iterator) -> flatten(map(stream, iterator))
var flattened = expand(from([
    [1,2,3]
    , [4,5,6]
    , [7,8,9]
]), function (list) {
    return from(list)
})

flattened.pipe(to([], function (list) {
    // The flattened values
    assert.deepEqual(list, [1,2,3,4,5,6,7,8,9])
    console.log("list", list)
}))

// flatten(stream)
// Assumes the stream contains chunk which are themself streams
// it then flattens out all of the chunks from the streams into one stream
function expand(stream, iterator) {
    return flatten(map(stream, iterator))
}
