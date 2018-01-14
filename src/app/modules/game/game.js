global.Phaser = require('phaser');

class Game extends Phaser.Game {
  constructor(width, height, phaserMode, htmlDomName, obj) {
    super(width, height, phaserMode, htmlDomName);
    this.onGameClose = [];
  }

  save() {
    for(var i in this.onGameClose) {
      this.onGameClose[i]();
    }
  }
}

export default Game;
