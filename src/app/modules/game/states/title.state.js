import JsonState from './json.state';

class TitleState extends JsonState {
  init() {
    this.scale.scaleModel = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }

  init(levelData) {
    this.levelData = levelData;
  }

  create() {
    this.setGroups();
    this.setSprites();
  }

  setGroups() {
    this.groups = {}
    this.levelData.groups.forEach((groupName) => {
      this.groups[groupName] = this.game.add.group();
    }, this);
  }

  setSprites() {
    this.sprites = {};
    for(var spriteName in this.levelData.sprites) {
      var spriteData = this.levelData.sprites[spriteName];
      switch(spriteData.type) {
        case 'sprite':
          var sprite = this.game.add.sprite(spriteData.position.x, spriteData.position.y, spriteData.texture); break;
        case 'text':
        var sprite = this.game.add.text(spriteData.position.x, spriteData.position.y, spriteData.text, spriteData.style); break;
      }
      this.sprites[spriteName] = sprite;
      this.groups[spriteData.group].add(sprite);
    }
  }
}
export default TitleState;
