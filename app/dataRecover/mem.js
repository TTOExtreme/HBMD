const sysinfo = require("systeminformation");

let data = [];
let Program;
let min = { used: 1000000000000, swapused: 1000000000000 }
let max = { used: 0, swapused: 0 }
let med = { used: 0, swapused: 0 }
let info = {}


function init(_Program) {
    Program = _Program;
    setInterval(request, Program.config.intervalCollect);
    setInterval(send, Program.config.interval)
}

function send(e) {
    let index = 0;
    data.forEach(item => {
        med.used += parseFloat(item.used);
        med.swapused += parseFloat(item.swapused);
        index++;
    })
    med.used = (med.used / index).toFixed(2).toString();
    med.swapused = (med.swapused / index).toFixed(2).toString();

    Program.connector.send({ route: "MEM", data: data, info: info, min: min, max: max, med: med, timestamp: new Date().getTime() })
    data = [];

    max = { used: 1000000000000, swapused: 1000000000000 }
    max = { used: 0, swapused: 0 }
    med = { used: 0, swapused: 0 }
}

function request(e) {
    sysinfo.mem(memdata => {
        data.push({ total: memdata.total, used: memdata.used, swaptotal: memdata.swaptotal, swapused: memdata.swapused });
        if (memdata.swapused > max.swapused) { max.swapused = memdata.swapused }
        if (memdata.swapused < min.swapused) { min.swapused = memdata.swapused }
        if (memdata.used > max.used) { max.used = memdata.used }
        if (memdata.used < min.used) { min.used = memdata.used }

    })

}



module.exports = { init };