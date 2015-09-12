var slice = Array.prototype.slice
    , EventEmitter = require("events").EventEmitter

ReEmitter.reemit = reemit

module.exports = ReEmitter

function ReEmitter(other, list) {
    var emitter = new EventEmitter()

    reemit(other, emitter, list)

    return emitter
}

function reemit(source, target, events) {
    events.forEach(proxyEvent, {
        source: source
        , target: target
    })
}

function proxyEvent(eventName) {
    var source = this.source
        , target = this.target

    source.on(eventName, propagate)

    function propagate() {
        var args = [].slice.call(arguments)
        args.unshift(eventName)
        target.emit.apply(target, args)
    }
}