import JsonState from './json.state';
import SpritePrefab from '../prefabs/sprite.prefab';
import PlayerPrefab from '../prefabs/world/player.prefab';
import DoorPrefab from '../prefabs/world/door.prefab';
import NpcPrefab from '../prefabs/world/npc.prefab';

class WorldState extends JsonState {
    constructor() {
    super();
    this.prefabClasses = {
      background: SpritePrefab,
      player: PlayerPrefab,
      door: DoorPrefab,
      npc: NpcPrefab
    }
  }

  init(levelData) {
    super.init(levelData);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 0;
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
    if (typeof this.prefabClasses[object.type] !== 'undefined') {
      var prefab = new this.prefabClasses[object.type](this, object.name, position, object.properties);
    } else {
      console.warn("Prefab " + object.type + " does not exists.")
    }
  }

  centerObjectAnchor(object) {
    return {
      x: object.x + (object.width / 2),
      y: object.y + (object.height / 2)
    };
  }

  preload() {
    for(var npcMessageName in this.levelData.npcMessages){
      this.load.text(npcMessageName, this.levelData.npcMessages[npcMessageName])
    }
  }
}
export default WorldState;
