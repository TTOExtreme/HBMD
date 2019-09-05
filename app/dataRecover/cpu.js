const os = require('os-utils');


var last_save = 0;
var data = [];
var Program;


function init(_Program) {
    Program = _Program;
    setInterval(request, 1000);
}

function request(e) {
    var d = {};
    os.cpuUsage((percent) => {
        d.percent = percent;
        d.count = os.cpuCount();
        d.timestamp = new Date().getTime();
        os.cpuFree((free) => {
            d.free = free;
            data.push(d);
            if (last_save + (10 * 1000) < d.timestamp) {
                Program.dataTransfer.cpu.append(data);
                data = [];
                last_save = new Date().getTime();
            }
        });
    });
}



module.exports = { init };