import mixins from 'es6-mixins';

class PrefabHelper {
  constructor(delegator) {
    this.delegator = delegator;
  }

  setScale(scale) {
    if(scale)
      this.delegator.scale.setTo(scale.x, scale.y);
  }

  setAnchor(anchor) {
    if(anchor)
      this.delegator.anchor.setTo(anchor.x, anchor.y);
  }

  setGameState(gameState) {
    this.delegator.gameState = gameState;
  }

  setName(name) {
    this.delegator.name = name;
  }

  addPrefab(name) {
    this.delegator.gameState.prefabs[name] = this.delegator;
  }

  addToGroup(group){
    this.delegator.gameState.groups[group].add(this.delegator);
  }
}

export default PrefabHelper;
