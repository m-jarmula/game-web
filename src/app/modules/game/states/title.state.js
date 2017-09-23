global.PIXI = require( 'phaser/dist/pixi' )
global.p2 = require( 'phaser/dist/p2' )
global.Phaser = require('phaser');

class TitleState extends Phaser.State {
  init() {
    this.scale.scaleModel = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }
  preload() {
    this.load.image('background_image', '/img/battle/background.png');
  }
  create() {
    var backgorund = this.game.add.sprite(0, 0, 'background_image');
    var title = this.game.add.text(100, 100, "Phaser RPG")
  }
}
export default TitleState;
