import PlayerPrefab from '../prefabs/world/player.prefab';

const DIRECTION_LEFT = 'left',
DIRECTION_RIGHT = 'right',
DIRECTION_UP = 'up',
DIRECTION_DOWN = 'down';

class PlayerGroup extends Phaser.Group {

  constructor(game, name) {
    super(game, game.world, name);
    this.currentUser = game.di.sessionService.currentUser;
    this.currentPlayer = null;
    this.enableBody = true;
    this.ws = this.game.di.ws;
    this.joinWebSocketChannels();
  }

  findPlayer(userId) {
    for(var i in this.children) {
      var player = this.children[i];
      if(player.properties.user_id == userId)
        return player;
    }
  }

  joinWebSocketChannels() {
    this.movementSubscription = this.ws.joinChannel('MovementChannel',(data)=>{
      var player = this.findPlayer(data.user_id);
      if(player)
        player.changeMovement(data.direction, data.move);
    });
  }

  removePlayer(userId){
    var player = this.findPlayer(userId);
    player.kill();
    this.children.pop(player);
  }

}

export default PlayerGroup;
