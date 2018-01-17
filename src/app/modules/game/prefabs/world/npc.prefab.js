import SpritePrefab from '../sprite.prefab';
import MessageBoxPrefab from '../../prefabs/tools/message_box.prefab';

class NpcPrefab extends SpritePrefab {
  constructor(gameState, name, position, properties) {
    super(gameState, name, position, properties);

    this.anchor.setTo(0.5);

    this.message = this.gameState.game.cache.getText(properties.message);
    this.gameState.game.physics.arcade.enable(this);

    this.body.immovable = true;
  }

  update() {
    // this.gameState.game.physics.arcade.collide(
    //   this,
    //   this.gameState.groups.main_player,
    //   this.talkToMainPlayer,
    //   null,
    //   this
    // );
    // this.gameState.game.physics.arcade.collide(
    //   this,
    //   this.gameState.groups.players,
    //   this.talkToPlayer,
    //   null,
    //   this
    // );
  }

  talkToMainPlayer(npc, player) {
    player.stop();
    this.gameState.currentMessageBox = new MessageBoxPrefab(this.gameState,
                                                            this.name + '_message',
                                                            this.message);
    this.gameState.userInput.setInput(this.gameState.userInputs.talking_user_input);
  }

  talkToPlayer(npc, player) {
    player.stop();
    this.gameState.currentMessageBox = new MessageBoxPrefab(this.gameState,
                                                            this.name + '_message',
                                                            this.message);
    this.gameState.userInput.setInput(this.gameState.userInputs.talking_user_input);
  }
}

export default NpcPrefab;
