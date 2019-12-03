const fs = require("fs");

let Program;

function log(text) {
    if (!fs.existsSync(Program.logFilePath)) {
        fs.writeFileSync(Program.logFilePath, "");
    }
    fs.appendFileSync(Program.logFilePath, "[" + Date.now() + "] >> " + text + "\n");
}

function init(_Program) {
    Program = _Program;
    Program.log = this.log;
}


module.exports = { init, log };