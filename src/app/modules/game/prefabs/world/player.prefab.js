import SpritePrefab from '../sprite.prefab';
import MoveableConcern from '../../concerns/moveable.concern';

const FACE_DOWN_FRAME = 0,
      FACE_LEFT_FRAME = 2,
      FACE_RIGHT_FRAME = 3,
      FACE_UP_FRAME= 1;
class PlayerPrefab extends SpritePrefab {
  constructor(gameState, name, position, properties) {
    super(gameState, name, position, properties);
    this.anchor.setTo(0.5);
    this.walkingSpeed = +properties.walkingSpeed;
    this.gameState.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    this.cursors = this.gameState.game.input.keyboard.createCursorKeys();
    this.moveable = new MoveableConcern(this);
    this.canMove = true;
    this.animations.add("walkingDown", [0, 4, 8, 12], 6, true);
    this.animations.add("walkingUp", [1, 5, 9, 13], 6, true);
    this.animations.add("walkingLeft", [2, 6, 10, 14], 6, true);
    this.animations.add("walkingRight", [3, 7, 11, 15], 6, true);

    this.stoppedFrames = [FACE_DOWN_FRAME, FACE_LEFT_FRAME, FACE_RIGHT_FRAME, FACE_UP_FRAME];

    this.moving = {left: false, right: false, up: false, down: false};
  }

  changeMovement(direction, move) {
    this.moving[direction] = move;
  }

  update() {
    this.gameState.game.physics.arcade.collide(this, this.gameState.layers.buildings);
    this.moveable.watchMovement();
  }

  moveLeft() {
    this.body.velocity.x = -this.walkingSpeed;
    if(this.body.velocity.y === 0)
      this.animations.play('walkingLeft');
  }

  moveRight() {
    this.body.velocity.x = +this.walkingSpeed;
    if(this.body.velocity.y === 0)
      this.animations.play('walkingRight');
  }

  moveUp() {
    this.body.velocity.y = -this.walkingSpeed;
    if(this.body.velocity.x === 0)
      this.animations.play('walkingUp');
  }

  moveDown() {
    this.body.velocity.y = +this.walkingSpeed;
    if(this.body.velocity.x === 0)
      this.animations.play('walkingDown');
  }

  stop() {
    this.animations.stop();
    this.frame = this.stoppedFrames[this.body.facing];
  }
 }

export default PlayerPrefab;
