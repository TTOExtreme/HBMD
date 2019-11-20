const os = require('os-utils');


let last_save = 0;
let data = [];
let Program;


function init(_Program) {
    Program = _Program;
    setInterval(request, Program.config.intervalCollect);
    setInterval(send, Program.config.interval)
}

function send(e) {
    Program.connector.send({ route: "CPU", data: data })
    data = [];
}

function request(e) {
    let d = {};
    os.cpuUsage((percent) => {
        d.percent = percent.toFixed(2);
        d.count = os.cpuCount();
        d.timestamp = new Date().getTime();
        os.cpuFree((free) => {
            d.free = free.toFixed(2);
            data.push(d);
        });
    });
}



module.exports = { init };