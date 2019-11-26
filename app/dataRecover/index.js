let cpu = require("./cpu")
let mem = require("./mem")
let disk = require("./disk")
let diskFiles = require("./diskFiles")
let network = require("./network")
let system = require("./system")

function init(Program) {
    cpu.init(Program);
    network.init(Program);
    system.init(Program);
    mem.init(Program);
    disk.init(Program);
    diskFiles.init(Program);
}

module.exports = { init }