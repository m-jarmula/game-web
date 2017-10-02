import JsonState from './json.state';

class TitleState extends JsonState {
  init(levelFile) {
    this.levelFile = levelFile;

    this.scale.scaleModel = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }

  preload() {
    this.load.text('level_file', this.levelFile);
  }

  create() {
    var levelData = JSON.parse(this.game.cache.getText('level_file'));
    this.game.state.start("LoadingState", true, false, levelData)
  }
}
export default TitleState;
