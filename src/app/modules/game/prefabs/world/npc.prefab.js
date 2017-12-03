import SpritePrefab from '../sprite.prefab';
import MessageBoxPrefab from '../tools/message_box.prefab';

class NpcPrefab extends SpritePrefab {
  constructor(gameState, name, position, properties) {
    super(gameState, name, position, properties);

    this.anchor.setTo(0.5);

    this.message = this.gameState.game.cache.getText(properties.message);
    this.gameState.game.physics.arcade.enable(this);

    this.body.immovable = true;
  }

  update() {
    this.gameState.game.physics.arcade.collide(this,
                                               this.gameState.groups.players,
                                               this.talk,
                                               null,
                                               this);

  }

  talk(npc, player) {
    player.stop();
    this.gameState.currentMessageBox = new MessageBoxPrefab(this.gameState,
                                                            this.name + '_message',
                                                            this.message)
  }
}

export default NpcPrefab;
