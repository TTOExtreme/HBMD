
let socketClient = require("socket.io-client");
let connection = null;
let connected = false;

let socket;

function init(Program) {
    Program.log("Connecting to Server on: " + Program.config.url)

    socket = socketClient("http://" + Program.config.url + "/HBMD");

    socket.on('connect', function () {

        socket.on("hs", (data) => {
            if (data.status == 0 && !connected) {
                Program.log("Connection Sucess");
                connected = true;
            }
        })

        socket.on("data", function (data) {

        });
        socket.on('disconnect', function () {
            connected = false;
            Program.log("Connection Broken");
            //setTimeout(() => { init(Program) }, 500);
        })
        socket.emit("auth", Program.Computerdata)
    });
}

function send(data) {
    if (connected) {
        //Program.log("Send");
        socket.emit("data", data);
    }
}


module.exports = { init, send }