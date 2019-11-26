let path = require("path")
let fs = require('fs');


let Program = {
    config: {
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
    Computerdata: {}
};
let cfgPath = "/config.json";
if (process.argv.length > 0) {
    for (let av = 0; av < process.argv.length; av++) {
        let arg = process.argv[av];
        if ((arg == "-p" || arg == "/p") && process.argv.length > av) {
            cfgPath = process.argv[av + 1] + cfgPath;
        }
    }
}

if (fs.existsSync(path.join(cfgPath))) {
    try {
        Program.config = JSON.parse(fs.readFileSync(path.join(cfgPath)));
        console.log("loaded config")
    } catch (err) {
        console.error("[Error] on loading config ", err)
    }
} else {
    console.log("config not found on: " + path.join(cfgPath));
}

require("./dataTransfer").init(Program);
require("./dataRecover").init(Program);