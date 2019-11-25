const os = require('os-utils');

let data = [];
let Program;
let min = { percent: 100 }
let max = { percent: 0 }
let med = { percent: 0 }
let info = {}


function init(_Program) {
    Program = _Program;
    setInterval(request, Program.config.intervalCollect);
    setInterval(send, Program.config.interval)
    let cpuinfo = require('os').cpus().pop()
    info = { model: cpuinfo.model, speed: cpuinfo.speed }
}

function send(e) {
    let index = 0;
    data.forEach(item => {
        med.percent += parseFloat(item.percent);
        index++;
    })
    med.percent = (med.percent / index).toFixed(2).toString();

    Program.connector.send({ route: "CPU", data: data, info: info, min: min, max: max, med: med, timestamp: new Date().getTime() })
    data = [];

    min = { percent: 100 }
    max = { percent: 0 }
    med = { percent: 0 }
}

function request(e) {
    let d = {};
    os.cpuUsage((percent) => {
        d.percent = (percent * 100).toFixed(2);
        if (d.percent > max.percent) { max.percent = d.percent };
        if (d.percent < min.percent) { min.percent = d.percent };


        d.count = os.cpuCount();
        os.cpuFree((free) => {
            d.free = (free * 100).toFixed(2);
            data.push(d);
        });
    });
}



module.exports = { init };