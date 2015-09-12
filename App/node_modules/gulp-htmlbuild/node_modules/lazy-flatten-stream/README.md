# lazy-flatten-stream

Flatten a stream of streams into a single stream

## Example

```
var from = require("read-stream")
    , to = require("write-stream")
    , flatten = require("..")
    , map = require("lazy-map-stream")
    , assert = require("assert")
    , list = []

// expand(stream, iterator) -> flatten(map(stream, iterator))
var flattened = expand(from([
    [1,2,3]
    , [4,5,6]
    , [7,8,9]
]), function (list) {
    return from(list)
})

flattened.pipe(to(list, function () {
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
```

## Installation

`npm install lazy-flatten-stream`

## Contributors

 - Raynos

## MIT Licenced