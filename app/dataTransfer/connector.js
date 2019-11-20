
let socketClient = require("socket.io-client");
let connection = null;
let connected = false;

let socket;

function init(Program) {
    console.log("Connecting to Server on: " + Program.config.url)

    socket = socketClient(Program.config.url);

    socket.on('connect', function () {

        socket.on("hs", (data) => {
            if (data.status == 0) {
                console.log("Connection Sucess");
                connected = true;
            }
        })

        socket.on("data", function (data) {

        });
        socket.on('disconnect', function () {
            connected = false;
            setTimeout(() => { init(Program) }, 500);
        })
        socket.emit("auth", { hostname: Program.Computerdata.hostname })
    });
}

function send(data) {
    if (connected) {
        socket.emit("data", data);
    }
}


module.exports = { init, send }