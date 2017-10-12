import JsonState from './json.state';

class LoadingState extends JsonState {
  init(levelData, nextState) {
    this.levelData = levelData;
    var message = this.game.add.text(this.game.world.centerX,
                                     this.game.world.centerY,
                                     'Loading',
                                     { font: '48px Kells', fill: '#fff' }
                                    );
    message.anchor.setTo(0.5, 0.5);
    this.nextState = nextState;
  }

  preload() {
    var assets = this.levelData.assets;
    for(var assetKey in assets) {
      var asset = assets[assetKey];
      switch(asset.type) {
        case 'image':
          this.load.image(assetKey, asset.source); break;
        case 'spritesheet':
          this.load.spritesheet(assetKey, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing); break;
        case 'tilemap':
          this.load.tilemap(assetKey, asset.source, null, Phaser.Tilemap.TILED_JSON); break;
      }
    }
    this.load.text('userInput', this.levelData.userInput);
  }

  create() {
    this.game.state.start(this.nextState, true, false, this.levelData);
  }
}
export default LoadingState;
