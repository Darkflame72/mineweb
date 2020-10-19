
// Workaround for non-chromium browsers
require("error-polyfill");

import { Mineweb } from "./lib/mineweb.js"

console.log("Mineweb version dev-1");

// Get minecraft server
let host;
while (host == "" || host == undefined) host = prompt("Host", "95.111.249.143:10000");
const mineweb = new Mineweb(host.split(":")[0], host.split(":")[1]);


// Get username
let username;
while (username == "" || username == undefined) username = prompt("Please choose a username");
console.log("Starting with username: " + username);
mineweb.start(username)

// Hack to make esc work
document.addEventListener("pointerlockchange", function(event) {
  const canvas = document.getElementById("noa-canvas");
  if (
    document.pointerLockElement === canvas ||
    document.mozPointerLockElement === canvas
  ) {
    console.log("The pointer lock status is now locked");
  } else {
    console.log("The pointer lock status is now unlocked");
  }
});
// END
