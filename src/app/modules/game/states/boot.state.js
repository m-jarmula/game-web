import JsonState from './json.state';

class BootState extends JsonState {
  init(levelFile, nextState) {
    this.levelFile = levelFile;
    this.nextState = nextState;

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.load.headers = JSON.parse(this.game.di.$cookies.get('auth_headers'));
  }

  preload() {
    this.load.text('level_file', this.levelFile + this.toParam());
  }

  create() {
    var levelData = JSON.parse(this.game.cache.getText('level_file'));
    this.game.state.start('LoadingState', true, false, levelData, this.nextState);
  }
}
export default BootState;
