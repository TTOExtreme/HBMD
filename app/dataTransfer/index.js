
function init(Program) {
    Program.connector = require("./connector");
    Program.connector.init(Program);
}

module.exports = { init }