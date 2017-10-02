import BaseState from './base.state';

class JsonState extends BaseState {
  init(levelData) {
    this.levelData = levelData;
    var message = this.game.add.text(this.game.world.centerX,
                                     this.game.world.centerY,
                                     'Loading',
                                     { font: '48px Kells', fill: '#fff' }
                                    );
    message.anchor.setTo(0.5, 0.5);
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
      }
    }
  }

  create() {
    this.game.state.start("TitleState", true, false, this.levelData);
  }
}
export default JsonState;