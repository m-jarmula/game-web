class MoveableConcern {
  constructor(movableObject) {
    this.movableObject = movableObject;
  }

  watchMovement() {
    this.watchAxisX();
    this.watchAxisY();
    if(this.isNotMoving())
      this.movableObject.stop();
  }

  watchAxisX() {
    if(this.isMovingLeft()) {
      this.movableObject.moveLeft();
    } else if(this.isMovingRight()) {
      this.movableObject.moveRight();
    } else {
      this.movableObject.body.velocity.x = 0;
    }
  }

  watchAxisY() {
    if(this.isMovingUp()) {
      this.movableObject.moveUp();
    } else if(this.isMovingDown()) {
      this.movableObject.moveDown();
    } else {
      this.movableObject.body.velocity.y = 0;
    }
  }

  isMovingLeft() {
    return this.movableObject.cursors.left.isDown && this.movableObject.body.velocity.x <= 0;
  }

  isMovingRight() {
    return this.movableObject.cursors.right.isDown && this.movableObject.body.velocity.x >= 0;
  }

  isMovingUp() {
    return this.movableObject.cursors.up.isDown && this.movableObject.body.velocity.y <= 0;
  }

  isMovingDown() {
    return this.movableObject.cursors.down.isDown && this.movableObject.body.velocity.y >= 0;
  }

  isNotMoving() {
    return this.movableObject.body.velocity.y === 0 && this.movableObject.body.velocity.x === 0;
  }
}

export default MoveableConcern;
