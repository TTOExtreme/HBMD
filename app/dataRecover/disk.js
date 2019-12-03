const sysinfo = require("systeminformation");
const os = require('os');

let data = { layout: {} };
let Program;
let info = {};


function init(_Program) {
    Program = _Program;
    setInterval(request, Program.config.interval);
}

function send() {
    Program.connector.send({ route: "Disk", data: data, info: info, timestamp: new Date().getTime() })
}

function request(e) {
    sysinfo.fsSize((disks) => {
        data = disks;
        send();
    })
}

module.exports = { init };