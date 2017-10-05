import SpritePrefab from '../sprite.prefab';

class PlayerPrefab extends SpritePrefab {
  constructor(gameState, name, position, properties ) {
    super(gameState, name, position, properties);

    this.anchor.setTo(0.5);
    this.walkingSpeed = +properties.walkingSpeed;
    this.gameState.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
  }

  update() {
    this.gameState.game.physics.arcade.collide(this, this.gameState.layers.buildings);

    this.body.velocity.y = -this.walkingSpeed;
  }
}
export default PlayerPrefab;
