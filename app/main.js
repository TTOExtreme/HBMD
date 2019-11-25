
let bcypher = require('./utils/bcypher');

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
        url: "http://localhost:9899/HBMD"
    },
    Computerdata: {}
};

require("./dataTransfer").init(Program);
require("./dataRecover").init(Program);