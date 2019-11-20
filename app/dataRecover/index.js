let cpu = require("./cpu")
let mem = require("./mem")
let disk = require("./disk")
let network = require("./network")

function init(Program) {
    cpu.init(Program);
    network.init(Program);
}

module.exports = { init }