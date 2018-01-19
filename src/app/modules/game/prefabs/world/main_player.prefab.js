import SpritePrefab from '../sprite.prefab';
import MoveableConcern from '../../concerns/moveable.concern';
import PlayerPrefab from './player.prefab';
import SortedQueue from '../../helpers/sorted_queue.helper';

const FACE_DOWN_FRAME = 0,
      FACE_LEFT_FRAME = 2,
      FACE_RIGHT_FRAME = 3,
      FACE_UP_FRAME= 1;
/*
TODO: Do better channel implemantation, improve adding new player from websocket, refactor code
*/
class MainPlayerPrefab extends PlayerPrefab {
  constructor(gameState, name, position, properties) {
    super(gameState, name, position, properties);

    this.sortedQueue = new SortedQueue(4);
    this.ws = this.gameState.game.di.ws;
    this.joinMovementChannels();
    this.joinGameChannel(this);
    this.lastUpTimestamp = 0;
    this.lastDownTimestamp = 0;
    this.lastRightTimestamp = 0;
    this.lastLeftTimestamp = 0;
    this.gameState.game.onGameClose.push(() => {
      this.movementSubscription.then(() => {
        this.gameState.game.di.ws.send(
          'GameChannel',
          {
            x: this.position.x,
            y: this.position.y
          },
          'user_left'
        );
      })
    });
  }

  notifyMovement(direction, move) {
    this.movementSubscription.then(() => {
      this.gameState.game.di.ws.send('MovementChannel', {
        user_id: this.properties.user_id,
        direction: direction,
        move: move,
        timestamp: Date.now(),
        x: parseFloat(this.position.x, 10).toFixed(3),
        y: parseFloat(this.position.y, 10).toFixed(3)
      });
    })
  }

  update() {
    super.update();
    this.gameState.game.physics.arcade.collide(
        this,
        this.gameState.groups.players,
        this.talk,
        null,
        this
    );
  }

  talk(mainPlayer, otherPlayer) {
    this.stop();
    otherPlayer.stop();
    // this.gameState.userInput.setInput(this.gameState.userInputs.talking_user_input);
  }

  joinMovementChannels() {
    this.movementSubscription = this.ws.joinChannel('MovementChannel',(data) => {
      if(data.user_id == this.properties.user_id) {
        switch(data.direction){
          case 'up': {
            if(this.lastUpTimestamp < data.timestamp) {
              this.lastUpTimestamp = data.timestamp;
              this.changeMovement(data.direction, data.move);
            }
          }; return;
          case 'down': {
            if(this.lastDownTimestamp < data.timestamp) {
              this.lastDownTimestamp = data.timestamp;
              this.changeMovement(data.direction, data.move);
            }
          }; return;
          case 'right': {
            if(this.lastRightTimestamp < data.timestamp) {
              this.lastRightTimestamp = data.timestamp;
              this.changeMovement(data.direction, data.move);
            }
          }; return;
          case 'left': {
            if(this.lastLeftTimestamp < data.timestamp) {
              this.lastLeftTimestamp = data.timestamp;
              this.changeMovement(data.direction, data.move);
            }
          }; return;
        }
        // data = this.sortedQueue.add(data).last();
        // console.warn(data);
      }
    });
  }

  joinGameChannel(that) {
    that.gameSubscription = this.ws.joinChannel('GameChannel',(data) => {
      switch(data.method){
        case 'user_joined': that.userJoined(that, data.player); return;
        case 'user_left': that.userLeft(that, data); return;
      }

    });
  }

  userJoined(that, player) {
    if(!that.gameState.groups.players.findPlayer(player.properties.user_id) &&
      that.properties.user_id != player.properties.user_id)
    {
      var prefabClass = that.gameState.prefabClasses.player;
      player.properties.group = 'players';
      new prefabClass(that.gameState, player, { x: player.x, y: player.y }, player.properties);
    }
  }

  userLeft(that, data) {
    if(that.gameState.groups.players.findPlayer(data.user_id)){
      that.gameState.groups.players.removePlayer(data.user_id);
    }
  }
}

export default MainPlayerPrefab;
