import PlayerGroup from './groups/player.group';

class Game extends Phaser.Game {
  constructor(width, height, phaserMode, htmlDomName, obj) {
    super(width, height, phaserMode, htmlDomName);
  }
}

export default Game;
