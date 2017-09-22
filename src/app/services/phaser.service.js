global.PIXI = require( 'phaser/dist/pixi' )
global.p2 = require( 'phaser/dist/p2' )
global.Phaser = require('phaser');

class PhaserService {
  constructor() {
    this.game =   new Phaser.Game(
      800, 600,         // width x height
      Phaser.AUTO,      // the game context, 2D/3D
      'game_canvas'     // id of the DOM element to add the game
    );
    console.warn(this.game);
  }
}

export default PhaserService;
