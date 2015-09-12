var from = require("./from")

module.exports = callback

function callback(generator) {
    return from(function (_, end) {
        generator(end)
    })
}
