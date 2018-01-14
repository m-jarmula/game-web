import SpritePrefab from '../sprite.prefab';

class DoorPrefab extends SpritePrefab {
  constructor(gameState, name, position, properties) {
    super(gameState, name, position, properties);

    this.anchor.setTo(0.5);

    this.nextLevel = properties.next_level;
    this.gameState.game.physics.arcade.enable(this);

    this.body.immovable = true;
  }

  update() {
    this.gameState.game.physics.arcade.collide(this, this.gameState.groups.players,
                                        this.enter, null, this);

  }

  enter() {
    this.gameState.game.state.start("BootState", true, false, this.nextLevel, "WorldState");
  }
}

export default DoorPrefab;
