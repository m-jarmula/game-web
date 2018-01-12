import PlayerPrefab from '../prefabs/world/player.prefab';

class PlayerGroup extends Phaser.Group {
  constructor(game, name) {
    super(game, game.world, name);
    this.currentUser = game.di.sessionService.currentUser;
    this.currentPlayer = null;
  }

  getCurrentPlayer() {
    if(this.currentPlayer)
      return this.currentPlayer;
    for(var i in this.children) {
      var player = this.children[i];
      if(this.currentUser.id == player.properties.user_id)
        this.currentPlayer = player;
    }
    return this.currentPlayer;
  }

}

export default PlayerGroup;
