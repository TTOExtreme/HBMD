let cpu = require("./cpu")
let mem = require("./mem")
let disk = require("./disk")
let network = require("./network")
let system = require("./system")

function init(Program) {
    cpu.init(Program);
    network.init(Program);
    system.init(Program);
    mem.init(Program);
}

module.exports = { init }