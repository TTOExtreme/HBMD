const sysinfo = require("systeminformation");

var online = true;
var last_save = 0;
var data = [];
var Program;


function init(_Program) {
    Program = _Program;
    setInterval(request, 1000);
}

function request(e) {
}



module.exports = { init };