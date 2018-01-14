global.PIXI = require( 'phaser/dist/pixi' )
global.p2 = require( 'phaser/dist/p2' )
global.Phaser = require('phaser');

class BaseState extends Phaser.State {
  constructor() {
    super();
  }

  getPlayer() {
    this.gameState.di.SessionService.currentUser;
  }
}
export default BaseState;
