import PlayerPrefab from '../prefabs/world/player.prefab';
import MovementDetectorHelper from '../helpers/movement_detector.helper';

const DIRECTION_LEFT = 'left',
DIRECTION_RIGHT = 'right',
DIRECTION_UP = 'up',
DIRECTION_DOWN = 'down';

class PlayerGroup extends Phaser.Group {

  constructor(game, name) {
    super(game, game.world, name);
    this.movementDetectorHelper = new MovementDetectorHelper();
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
      if(player){
        player.movementDetectorHelper = player.movementDetectorHelper || new MovementDetectorHelper();
        if(this.movementDetectorHelper.validateTimestamp(data)) {
          var remoteX = parseInt(data.x, 10);
          var remoteY = parseInt(data.y, 10);
          var localX = parseInt(player.x, 10);
          var localY = parseInt(player.y, 10);
          if(Math.abs(remoteX - localX) == 20)
            player.x = remoteX;
          if(Math.abs(remoteY - localY) == 20)
            player.y = remoteY;
          player.changeMovement(data.direction, data.move);
          this.movementDetectorHelper.updateTimestamp(data);
        }
      }
    });
  }

  removePlayer(userId) {
    var player = this.findPlayer(userId);
    player.kill();
    this.children.pop(player);
  }

}

export default PlayerGroup;
