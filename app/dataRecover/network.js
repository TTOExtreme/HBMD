const sysinfo = require("systeminformation");
const os = require('os');

let online = true;
let last_save = 0;
let data = [];
let Program;


function init(_Program) {
    Program = _Program;
    setInterval(request, Program.config.intervalCollect);
    setInterval(send, Program.config.interval)

    Program.Computerdata = { hostname: os.hostname(), NIC: getMyIpAddress() }
}

function send(e) {
    Program.connector.send({ route: "NIC", data: data })
    data = [];
}

function request(e) {
    let ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach((iface) => {
        sysinfo.networkStats(iface.iface, (ifState) => {
            ifState.forEach((ifData) => {
                data.push({ interface: ifData.iface, rx: ifData.rx_sec, tx: ifData.tx_sec })
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