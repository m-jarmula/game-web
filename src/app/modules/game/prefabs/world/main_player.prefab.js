import SpritePrefab from '../sprite.prefab';
import MoveableConcern from '../../concerns/moveable.concern';
import PlayerPrefab from './player.prefab';

const FACE_DOWN_FRAME = 0,
      FACE_LEFT_FRAME = 2,
      FACE_RIGHT_FRAME = 3,
      FACE_UP_FRAME= 1;
class MainPlayerPrefab extends PlayerPrefab {
  constructor(gameState, name, position, properties) {
    super(gameState, name, position, properties);
    this.properties = properties;
    this.anchor.setTo(0.5);
    this.walkingSpeed = +properties.walkingSpeed;
    this.gameState.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.ws = this.gameState.game.di.ws;

    this.cursors = this.gameState.game.input.keyboard.createCursorKeys();
    this.moveable = new MoveableConcern(this);
    this.animations.add("walkingDown", [0, 4, 8, 12], 6, true);
    this.animations.add("walkingUp", [1, 5, 9, 13], 6, true);
    this.animations.add("walkingLeft", [2, 6, 10, 14], 6, true);
    this.animations.add("walkingRight", [3, 7, 11, 15], 6, true);

    this.stoppedFrames = [FACE_DOWN_FRAME, FACE_LEFT_FRAME, FACE_RIGHT_FRAME, FACE_UP_FRAME];

    this.moving = {left: false, right: false, up: false, down: false};
    this.joinWebSocketChannels();
    this.gameState.game.onGameClose.push(() => {
      this.movementSubscription.then(() => {
        this.gameState.game.di.ws.send(
          'MovementChannel',
          {
            x: this.position.x,
            y: this.position.y
          },
          'save'
        );
      })
    });
  }

  changeMovement(direction, move) {
    this.moving[direction] = move;
    this.movementSubscription.then(() => {
      this.gameState.game.di.ws.send('MovementChannel', {
        user_id: this.properties.user_id,
        direction: direction,
        move: move
      });
    })
  }

  update() {
    this.gameState.game.physics.arcade.collide(this, this.gameState.layers.buildings);
    this.gameState.game.physics.arcade.collide(
        this,
        this.gameState.groups.players,
        this.talk,
        null,
        this
    );
    this.moveable.watchMovement();
  }

  talk(mainPlayer, otherPlayer) {
    this.stop();
    otherPlayer.stop();
    this.gameState.userInput.setInput(this.gameState.userInputs.talking_user_input);
  }

  joinWebSocketChannels() {
    this.movementSubscription = this.ws.joinChannel('MovementChannel',(data) => {});
  }

  onGameClose() {

  }
}

export default MainPlayerPrefab;
