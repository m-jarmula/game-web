import JsonState from './json.state';
import SpritePrefab from '../prefabs/sprite.prefab';
import PlayerPrefab from '../prefabs/world/player.prefab';

class WorldState extends JsonState {
    constructor() {
    super();
    this.prefabClasses = {
      background: SpritePrefab,
      player: PlayerPrefab
    }
  }

  init(levelData) {
    super.init(levelData);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 0;
  }

  create() {
    this.map = this.game.add.tilemap(this.levelData.map.key);
    console.warn(this.map.tilesets);
    var tilesetIndex = 0;
    this.map.tilesets.forEach((tileset) => {
      this.map.addTilesetImage(tileset.name, this.levelData.map.tilesets[tilesetIndex]);
      tilesetIndex++;
    }, this);
    this.layers = {};
    this.map.layers.forEach((layer) => {
      this.layers[layer.name] = this.map.createLayer(layer.name);
      if(layer.properties.collision) {
        this.map.setCollisionByExclusion([-1], true, layer.name);
      }
    }, this);
    this.layers[this.map.layer.name].resizeWorld();
    super.create();

    for(var objectLayer in this.map.objects) {
      if (this.map.objects.hasOwnProperty(objectLayer)) {
        this.map.objects[objectLayer].forEach(this.createObject, this);
      }
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
