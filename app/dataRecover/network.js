const sysinfo = require("systeminformation");
const os = require('os');

let online = true;
let last_save = 0;
let data = [];
let Program;
let min = { rx: 1000000000, tx: 1000000000 }
let max = { rx: 0, tx: 0 }
let med = { rx: 0, tx: 0 }
let info = {}


function init(_Program) {
    Program = _Program;
    setInterval(request, Program.config.intervalCollect);
    setInterval(send, Program.config.interval)

    Program.Computerdata.NIC = getMyIpAddress();
    //Program.Computerdata = { hostname: os.hostname(), NIC: getMyIpAddress() }
}

function send(e) {
    let index = 0;
    data.forEach(item => {
        med.rx += parseFloat(item.rx);
        med.tx += parseFloat(item.tx);
        index++;
    })
    med.rx = (med.rx / index).toFixed(2).toString();
    med.tx = (med.tx / index).toFixed(2).toString();

    Program.connector.send({ route: "NIC", data: data, info: info, min: min, max: max, med: med, timestamp: new Date().getTime() })

    data = [];
    min = { rx: 1000000000, tx: 1000000000 }
    max = { rx: 0, tx: 0 }
    med = { rx: 0, tx: 0 }
}

function request(e) {
    let ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach((iface) => {
        sysinfo.networkStats(iface.iface, (ifState) => {
            ifState.forEach((ifData) => {
                if (ifData.rx_sec != 'Infinity' && ifData.rx_sec != '-1' && ifData.rx_sec.toFixed(2) != 'NaN' && ifData.tx_sec != 'Infinity' && ifData.tx_sec != '-1' && ifData.tx_sec.toFixed(2) != 'NaN') {

                    data.push({ interface: ifData.iface, rx: (ifData.rx_sec).toFixed(2), tx: (ifData.tx_sec).toFixed(2) })
                    if (ifData.rx_sec > max.rx) { max.rx = (ifData.rx_sec).toFixed(2) }
                    if (ifData.tx_sec > max.tx) { max.tx = (ifData.tx_sec).toFixed(2) }
                    if (ifData.rx_sec < min.rx) { min.rx = (ifData.rx_sec).toFixed(2) }
                    if (ifData.tx_sec < min.tx) { min.tx = (ifData.tx_sec).toFixed(2) }
                }
            })
        })
    })
}

function getMyIpAddress() {
    let IPArray = [];
    let ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function (ifname) {
        let alias = 0;
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) { return; }
            if (!Program.Computerdata.mac) { Program.Computerdata.mac = iface.mac; }
            if (alias >= 1) {
                IPArray.push({ interface: ifname + "." + alias, ip: iface.address })
            } else {
                IPArray.push({ interface: ifname, ip: iface.address })
            }
            ++alias;
        });
    });
    return IPArray;
}


module.exports = { init };