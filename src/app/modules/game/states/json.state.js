import BaseState from './base.state';
import SpritePrefab from '../prefabs/sprite.prefab';
import TextPrefab from '../prefabs/text.prefab';

class JsonState extends BaseState {
  init(levelData) {
    this.levelData = levelData;
  }

  create() {
    this.setGroups();
    this.setPrefabs();
  }

  setGroups() {
    this.groups = {}
    this.levelData.groups.forEach((groupName) => {
      this.groups[groupName] = this.game.add.group();
    }, this);
  }

  setPrefabs() {
    this.prefabs = {};
    for(var prefabName in this.levelData.prefabs) {
      var prefabData = this.levelData.prefabs[prefabName];
      var prefabClass = this.prefabClasses[prefabData.type];
      var prefab = new prefabClass(this, prefabData.name, prefabData.position, prefabData.properties);
    }
  }
}
export default JsonState;
