class MoveableConcern {
  constructor(movableObject) {
    this.movableObject = movableObject;
  }

  watchMovement() {
    if(!this.movableObject.canMove)
      return;
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
    return this.movableObject.moving.left && this.movableObject.body.velocity.x <= 0;
  }

  isMovingRight() {
    return this.movableObject.moving.right && this.movableObject.body.velocity.x >= 0;
  }

  isMovingUp() {
    return this.movableObject.moving.down && this.movableObject.body.velocity.y <= 0;
  }

  isMovingDown() {
    return this.movableObject.moving.up && this.movableObject.body.velocity.y >= 0;
  }

  isNotMoving() {
    return this.movableObject.body.velocity.y === 0 && this.movableObject.body.velocity.x === 0;
  }
}

export default MoveableConcern;
