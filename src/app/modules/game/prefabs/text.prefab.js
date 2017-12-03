global.Phaser = require('phaser');
import PrefabHelper from '../helpers/prefab.helper';

class TextPrefab extends Phaser.Text {
  constructor(gameState, name, position, properties) {
    super(gameState.game, position.x, position.y, properties.text, properties.style);

    var helper = new PrefabHelper(this);

    helper.setGameState(gameState);
    helper.setName(name);
    helper.addToGroup(properties.group)
    helper.setScale(properties.scale);
    helper.setAnchor(properties.anchor);
    helper.addPrefab(name);
  }
}

export default TextPrefab;
