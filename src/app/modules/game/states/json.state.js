import BaseState from './base.state';
import SpritePrefab from '../prefabs/sprite.prefab';
import TextPrefab from '../prefabs/text.prefab';
import UserInputPlugin from '../plugins/user-input.plugin.js';
import PlayerGroup from '../groups/player.group';

class JsonState extends BaseState {
  init(levelData) {
    this.levelData = levelData;
    this.userInputs = {};
    this.prefabGroupClasses = {
      players: PlayerGroup,
    }
  }

  create() {
    this.setGroups();
    this.setPrefabs();
    this.userInput = this.game.plugins.add(UserInputPlugin, this);
    for(var userInputName in this.levelData.userInput) {
      this.userInputs[userInputName] = JSON.parse(this.game.cache.getText(userInputName));
    }
    this.userInput.setInput(this.userInputs[this.levelData.initial_user_input]);
  }

  setGroups() {
    this.groups = {}
    this.levelData.groups.forEach((groupName) => {
      if(this.prefabGroupClasses[groupName]){
        this.groups[groupName] = new this.prefabGroupClasses[groupName](this.game, groupName);
      } else {
        this.groups[groupName] = this.game.add.group();
      }
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
