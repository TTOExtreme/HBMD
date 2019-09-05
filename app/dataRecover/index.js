var cpu = require("./cpu")
var mem = require("./mem")
var disk = require("./disk")
var network = require("./network")

function init(Program) {
    cpu.init(Program);
}

module.exports = { cpu, mem, disk, network, init }