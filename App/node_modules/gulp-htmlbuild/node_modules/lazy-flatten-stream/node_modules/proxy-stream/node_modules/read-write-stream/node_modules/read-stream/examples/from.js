var ReadStream = require("..")
    , fromArray = require("../array")
    , Stream = require("stream")
    , output = new Stream()

output.write = function (chunk) {
    console.log(chunk)
    return true
}

output.end = function () {
    console.log("ended")
}

//console.log("one")
var one = fromArray([1,2,3,4])

one.pipe(output)

//console.log("two")
var two = ReadStream(function (bytes, state) {
    var item = ++state.count
    if (item < 5) {
        return item
    }
    state.end()
}, { count: 0 })

two.stream.pipe(output)

var three = ReadStream()
    , threeCount = 0

var timer = setInterval(function () {
    threeCount++
    if (threeCount < 5) {
        three.push(threeCount)
    } else {
        clearInterval(timer)
        three.end()
    }
}, 500)

three.stream.pipe(output)

fromArray(["one", "two"]).pipe(output)
