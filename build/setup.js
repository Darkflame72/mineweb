import Engine from 'noa-engine';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
var mc = require('minecraft-protocol');
var { Vec3 } = require('vec3');
const Chunk = require('prismarine-chunk')("1.12.2");

var chunksToLoad = {}; // Not used yet - Chunks to load into noa

// Options for noa engine
var opts = {
    debug: true,
    showFPS: true,
    chunkSize: 16,
    chunkAddDistance: 0, // So I can handle adding chunks myself
    chunkRemoveDistance: 300.5,
    tickRate: 50, // ms per tick - not ticks per second
}

var client = mc.createClient({
  host: "91.203.193.189",
  port: 25565,
  username: "mineweb" + Math.floor(Math.random() * 1000),
  version: "1.12.2"
});