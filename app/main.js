let path = require("path")
let fs = require('fs');


let Program = {
    configFilePath: __dirname + "/config.json",
    programPath: __dirname + "/",
    config: {
        logFilePath: __dirname + "/log.txt",
        /**
         * intervalo para dados do sistema e processos
         */
        intervalSystem: 60 * 1000,
        /**
         * intervalo para coleta de dados em milisegundos
         */
        intervalCollect: 2 * 1000,
        /**
         * tempo para post de dados para o servidor em milisegundos
         */
        interval: 10 * 1000,
        url: "localhost:9899",
        /**
         * execução do commando de arvore de dados
         */
        tree: false
    },
    Computerdata: {},
    log: function (text) { }
};

var isWin = process.platform === "win32";
if (isWin) {
    Program.configFilePath = "C:/Program Files/HBMD/config.json"; //default
}

if (process.argv.length > 0) {
    for (let av = 0; av < process.argv.length; av++) {
        let arg = process.argv[av];
        if ((arg == "-p" || arg == "/p") && process.argv.length > av) {
            Program.programPath = process.argv[av + 1];
            Program.configFilePath = process.argv[av + 1] + "/config.json"
            Program.logFilePath = process.argv[av + 1] + "/log.txt"
        }
    }
}

let log = require("./log");
log.init(Program)
Program.log = log.log;

if (fs.existsSync(path.join(Program.configFilePath))) {
    try {
        Program.config = JSON.parse(fs.readFileSync(path.join(Program.configFilePath)));
        Program.log("loaded config")
    } catch (err) {
        Program.log("[Error] on loading config ", err)
    }
} else {
    Program.log("config not found on: " + path.join(Program.configFilePath));
}

if (isWin) {
    require("./trayhandler")(Program);
}
require("./dataTransfer").init(Program);
require("./dataRecover").init(Program);