module.exports.bind = (noa) => {
  
  var inputs = require('game-inputs')( noa.container );
  
  inputs.bind( 'move-forward',   'W', '<up>' );
  inputs.bind( 'move-left', 'A', '<left>' );
  inputs.bind( 'move-right', 'D', '<right>' );
  inputs.bind( 'move-backward', 'S', '<down>' );
  
  inputs.bind( 'break', '<mouse 1>' );
  inputs.bind( 'place', '<mouse 2>' );
  inputs.bind( 'pickBlock', '<mouse 3>' );
  
  inputs.bind( 'jump', '<space>' );
  inputs.bind( 'shift', '<shift-left>' );
  inputs.bind( 'sprint', '<control-left>' );
  
  inputs.bind( 'tab', '<tab>' );
  inputs.bind( 'pause', '<esc>' )
  
  inputs.bind( 'drop', 'Q' );
  inputs.bind( 'inventory', 'E' );
  
  inputs.bind( 'slot1', '1' );
  inputs.bind( 'slot2', '2' );
  inputs.bind( 'slot3', '3' );
  inputs.bind( 'slot4', '4' );
  inputs.bind( 'slot5', '5' );
  inputs.bind( 'slot6', '6' );
  inputs.bind( 'slot7', '7' );
  inputs.bind( 'slot8', '8' );
  inputs.bind( 'slot9', '9' );
};

////////////////////////////////////////////////////////////////////////

module.exports.setEvents = (noa) => {
  noa.inputs.down.on('fire', function () {
      // if (noa.targetedBlock) noa.setBlock(0, noa.targetedBlock.position)
  })
  noa.inputs.down.on('alt-fire', function () {
      // if (noa.targetedBlock) noa.addBlock(grassID, noa.targetedBlock.adjacent)
  })
};