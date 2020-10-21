import { Mineweb } from "./lib/mineweb";

let host: string;
while (host == "" || host == undefined)
    host = prompt("Host", "95.111.249.143:10000");
const port: number = +host.split(":")[1]
const mineweb = new Mineweb(host.split(":")[0], port);
// Get username
let username: string;
while (username == "" || username == undefined)
    username = prompt("Please choose a username");
console.log("Starting with username: " + username);
mineweb.start(username);
document.addEventListener("pointerlockchange", function () {
    const canvas = <HTMLCanvasElement> document.getElementById("noa-canvas");
    if (document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas) {
        console.log("The pointer lock status is now locked");
    }
    else {
        console.log("The pointer lock status is now unlocked");
    }
});