import JsonState from './json.state';

class BootState extends JsonState {
  init(levelFile, nextState) {
    this.levelFile = levelFile;
    this.nextState = nextState;

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }

  preload() {
    this.load.text('level_file', this.levelFile);
  }

  create() {
    var levelData = JSON.parse(this.game.cache.getText('level_file'));
    this.game.state.start('LoadingState', true, false, levelData, this.nextState);
  }
}
export default BootState;
