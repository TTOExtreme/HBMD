const sysinfo = require("systeminformation");
const os = require('os');

let data = {};
let Program;
let info = {};


function init(_Program) {
    Program = _Program;
    setInterval(request, Program.config.intervalSystem);
    setInterval(send, Program.config.intervalSystem)
}

function send(e) {
    if (info == {}) { return; }
    Program.connector.send({ route: "System", data: data, info: info, timestamp: new Date().getTime() })
}

function request(e) {
    data = {
        hostname: os.hostname(),
        os: os.type(),
        arch: os.arch(),
        NIC: os.networkInterfaces(),
        userinfo: os.userInfo(),
        cpu: os.cpus(),
        mem: os.totalmem(),
        uptime: os.uptime()
    }
    sysinfo.processes((process) => {
        info = JSON.stringify(process);
    })
}

module.exports = { init };