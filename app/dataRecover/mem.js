const sysinfo = require("systeminformation");

let online = true;
let last_save = 0;
let data = [];
let Program;


function init(_Program) {
    Program = _Program;
    setInterval(request, Program.config.intervalCollect);
}

function request(e) {

}



module.exports = { init };