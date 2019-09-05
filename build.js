const { exec } = require('pkg')
const path = require("path");
const fs = require("fs");

async function Build() {

    await exec([path.join(__dirname + '/app/main.js'), '--target', 'node10-linux,node10-win', '-o', path.join(__dirname + '/builds/HBMD')]);
    console.log("Build Done")
    process.exit();
}
Build();