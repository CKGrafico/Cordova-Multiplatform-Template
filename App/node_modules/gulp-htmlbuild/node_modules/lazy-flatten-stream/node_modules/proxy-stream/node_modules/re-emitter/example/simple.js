var EventEmitter = require("events").EventEmitter
    , ReEmitter = require("..")

var emitter = new EventEmitter()
    , other = ReEmitter(emitter, ["foo", "bar"])

other.on("foo", function () {
    console.log("fired")
})

other.on("baz", function () {
    console.log("should not fire")
})

emitter.on("bar", function () {
    console.log("should not fire")
})

emitter.emit("foo")
emitter.emit("baz")
other.emit("bar")