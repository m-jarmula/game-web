import JsonState from './json.state';
import SpritePrefab from '../prefabs/sprite.prefab';
import PlayerPrefab from '../prefabs/world/player.prefab';
import MainPlayerPrefab from '../prefabs/world/main_player.prefab';
import DoorPrefab from '../prefabs/world/door.prefab';
import NpcPrefab from '../prefabs/world/npc.prefab';

class WorldState extends JsonState {
    constructor() {
    super();
    this.prefabClasses = {
      background: SpritePrefab,
      player: PlayerPrefab,
      main_player: MainPlayerPrefab,
      door: DoorPrefab,
      npc: NpcPrefab
    }
    this.TEXT_STYLE = {
      font: '14px Kells',
      fill: '#FFF'
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
      x: object.x,
      y: object.y
    };
  }

  preload() {
    for(var npcMessageName in this.levelData.npcMessages){
      this.load.text(npcMessageName, this.levelData.npcMessages[npcMessageName])
    }
  }

  endTalk() {
    var mainPlayer = this.groups.main_player.children[0];
    this.userInput.setInput(this.userInputs.world_map_user_input);
  }
}
export default WorldState;
