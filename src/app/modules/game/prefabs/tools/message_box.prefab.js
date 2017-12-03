import SpritePrefab from '../sprite.prefab';
import TextPrefab from '../text.prefab';

class MessageBoxPrefab extends SpritePrefab {
  constructor(gameState, name, message) {
    var position = {
      x: 0,
      y: gameState.game.world.height * 0.75
    }

    var properties = {
      group: 'tools',
      texture: 'message_box_image',
      message: message
    }
    super(gameState, name, position, properties);
    this.messageText = new TextPrefab(this.gameState,
                                      this.name + '_message',
                                      {
                                        x: this.x + (this.width / 2),
                                        y: this.y + 50
                                      },
                                      {
                                        group: 'tools',
                                        text: properties.message,
                                        style: Object.create(this.gameState.TEXT_STYLE)
                                      });
    this.messageText.anchor.setTo(0.5)
  }
}

export default MessageBoxPrefab;
