import SpritePrefab from '../sprite.prefab';
import TextPrefab from '../text.prefab';

class PlayerLabelPrefarb extends SpritePrefab {
  constructor(gameState, name, position, properties) {
    var position = {
      x: position.x - (properties.width / 2),
      y: position.y - (properties.height + 10)
    }

    var properties = Object.assign({
      group: 'tools',
      texture: 'message_box_image',
      message: name
    }, properties);
    super(gameState, name, position, properties);
    this.properties = properties;
    this.width = properties.width;
    this.height = properties.height;
    this.messageText = new TextPrefab(this.gameState,
                                      this.name + '_text_box',
                                      {
                                        x: this.x + (this.width / 2),
                                        y: this.y + 9
                                      },
                                      {
                                        group: 'tools',
                                        text: name,
                                        style: Object.create(properties.textStyle)
                                      });
    this.messageText.anchor.setTo(0.5);
    this.gameState = gameState;
  }

  updatePosition(position) {
    this.x = position.x - (this.properties.width / 2);
    this.y = position.y - (this.properties.height + 10)
    this.messageText.x = this.x + (this.width / 2);
    this.messageText.y = this.y + 9;
  }

  kill() {
    super.kill();
    this.messageText.kill();
  }
}

export default PlayerLabelPrefarb;
