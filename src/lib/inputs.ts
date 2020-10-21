import Engine from "noa-engine"
import * as _inputs from "game-inputs"

// import { addChatEvents } from "./chat.js";
export function bindInputs(noa: Engine): void {
    const inputs = _inputs(noa.container.element);
    // inputs.disabled = true;
    inputs.bind("move-forward", "W", "<up>");
    inputs.bind("move-left", "A", "<left>");
    inputs.bind("move-right", "D", "<right>");
    inputs.bind("move-backward", "S", "<down>");
    inputs.bind("break", "fire");
    inputs.bind("place", "alt-fire");
    inputs.bind("pickBlock", "mid-fire");
    inputs.bind("jump", "<space>");
    inputs.bind("shift", "<shift-left>");
    inputs.bind("sprint", "<control-left>");
    inputs.bind("tab", "<tab>");
    inputs.bind("pause", "<esc>");
    inputs.bind("chat", "T");
    inputs.bind("drop", "Q");
    inputs.bind("inventory", "E");
    inputs.bind("slot1", "1");
    inputs.bind("slot2", "2");
    inputs.bind("slot3", "3");
    inputs.bind("slot4", "4");
    inputs.bind("slot5", "5");
    inputs.bind("slot6", "6");
    inputs.bind("slot7", "7");
    inputs.bind("slot8", "8");
    inputs.bind("slot9", "9");
}

export function setEventInputs(noa: Engine): void {
    // // on left mouse, set targeted block to be air
    // noa.inputs.down.on('fire', function () {
    //     if (noa.targetedBlock) noa.setBlock(0, noa.targetedBlock.position)
    // })


    // // place block on alt-fire (RMB/E)
    // var pickedID = 1
    // noa.inputs.down.on('alt-fire', function () {
    //     if (noa.targetedBlock) noa.addBlock(pickedID, noa.targetedBlock.adjacent)
    // })


    // // pick block on middle fire (MMB/Q)
    // noa.inputs.down.on('mid-fire', function () {
    //     if (noa.targetedBlock) pickedID = noa.targetedBlock.blockID
    // })
}

