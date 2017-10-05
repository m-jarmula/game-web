import JsonState from './json.state';
import SpritePrefab from '../prefabs/sprite.prefab';

class WorldState extends JsonState {
    constructor() {
    super();
    this.prefabClasses = {
      background: SpritePrefab,
      player: SpritePrefab
    }
  }

  create() {
    this.map = this.game.add.tilemap(this.levelData.map.key);
    var tilesetIndex = 0;
    this.map.tilesets.forEach((tileset) => {
      this.map.addTilesetImage(tileset.name, this.levelData.map.tilesets[tilesetIndex]);
      tilesetIndex++;
    }, this);
    this.layers = {};
    this.map.layers.forEach((layer) => {
      this.layers[layer.name] = this.map.createLayer(layer.name);
      if(layer.collision) {
        this.map.setCollisionByExclusion([-1], true, layer.name);
      }
    });
    this.layers[this.map.layer.name].resizeWorld();
    super.create();

    for(var objectLayer in this.map.objects) {
      this.map.objects[objectLayer].forEach(this.createObject, this);
    }
  }

  createObject(object) {
    var position = this.centerObjectAnchor(object);
    var prefab = new this.prefabClasses[object.type](this, object.name, position, object.properties);
  }

  centerObjectAnchor(object) {
    return {
      x: object.x + (object.width / 2),
      y: object.y + (object.height / 2)
    };
  }
}
export default WorldState;
