import { Mineweb } from "../mineweb";
// import * as _Chunk from "prismarine-chunk";
// const Chunk = _Chunk("1.12.2");
// window.chunksToLoad = {};
export function init(mineweb: Mineweb): void {
    mineweb._client.on("multi_block_change", function (packet) {
        console.log("Multi block change packet! ", packet);
        for (const record of packet.records) {
            const x = ((record.horizPos >> 4) & 15) + packet.chunkX * 16; // wiki.vg
            const y = record.y;
            const z = (record.horizPos & 15) + packet.chunkZ * 16;
            console.log("Multi change record:", x, y, z);
            blockChange(record.blockId, x, y, z);
            // do stuff
        }
    });
    mineweb._client.on("block_change", function (packet) {
        console.log("Block change packet! ", packet);
        blockChange(packet.type, packet.location.x, packet.location.y, packet.location.z);
    });
    function blockChange(type: number, x: number, y: number, z: number) {
        mineweb._noa.setBlock(type >> 4, // Needs to be bit shifted for 1.12 (our current target version) according to wiki.vg
        z, y, x);
    }

    // TODO: Implement chunk loading
    // mineweb._client.on("map_chunk", function (packet) {
    //     const chunk = new Chunk();
    //     chunk.load(packet.chunkData, packet.bitMap);
    //     for (let y = 0; y < 16; y++) {
    //         // TODO: Don't store the same thing lots of times
    //         chunksToLoad[`${packet.z}|${y}|${packet.x}`] = chunk; // x and z are reversed because otherwise it looks wrong
    //         /* if (!mineweb._noa.world._chunkIDsToRequest[`${packet.z}|${y}|${packet.x}`]) {
    //           mineweb._noa.world._chunkIDsToRequest.push(`${packet.z}|${y}|${packet.x}`);
    //         } */
    //         console.log(`${packet.z}|${y}|${packet.x}`);
    //         mineweb._noa.world.manuallyLoadChunk(packet.z * 16, y * 16, packet.x * 16);
    //     }
    // });
    // mineweb._client.on("unload_chunk", function (packet) {
    //     // noa.world.report() // Getting lag spikes when the report comes
    //     console.log("Unload packet!", packet);
    //     for (let y = 0; y < 16; y++) {
    //         console.log(`${packet.chunkZ}|${y}|${packet.chunkX}`);
    //         mineweb._noa.world.manuallyUnloadChunk(packet.chunkZ, y, packet.chunkX);
    //     }
    // });
}

