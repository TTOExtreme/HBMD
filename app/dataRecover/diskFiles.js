const sysinfo = require("systeminformation");
const dree = require('dree');
const options = {
    stat: false,
    normalize: true,
    followLinks: false,
    size: true,
    hash: true
};


let data = { list: [] };
let Program;
let info = {};


function init(_Program) {
    Program = _Program;
    //setInterval(request, Program.config.intervalSystem);

    if (Program.config.tree) {
        setTimeout(request, 5 * 1000);
    }
}

function send() {
    Program.connector.send({ route: "DiskFiles", data: data, info: info, timestamp: new Date().getTime() })
}

function request(e) {
    sysinfo.fsSize((disks) => {
        disks.forEach(d => {
            data.list.push(dree.scan(d.mount, options));
        })
        send();
    })
}

module.exports = { init };