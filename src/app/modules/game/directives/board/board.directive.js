import TitleState from '../../states/title.state';
import BootState from '../../states/boot.state';
import LoadingState from '../../states/loading.state';
import WorldState from '../../states/world.state';
import StateHelper from '../../helpers/state.helper';
import Game from '../../game';

class BoardDirective {
  constructor() {
    this.restrict = 'AE';

    this.template = require('./board.tpl.html');
    this.scope = {}
    this.controller = BoardDirectiveController
    this.controllerAs = 'CTRL'
  }
}

class BoardDirectiveController {
  constructor($scope, SessionService, WebSocketService) {
    // var consumer = new ActionCableChannel("GameChannel");
    // var callback = function(message) {
    //   console.warn(message);
    // };
    // consumer.subscribe(callback).then(function(){
    //   $scope.sendToMyChannel = function(message){
    //     consumer.send(message);
    //   };
    //   $scope.$on("$destroy", function(){
    //     consumer.unsubscribe().then(function(){ $scope.sendToMyChannel = undefined; });
    //   });
    // });
    // window.setTimeout(()=>{ console.warn(consumer.send('resr', 'game_state')); }, 5000)
    // consumer.send('resr', 'game_state').then((data)=>{
    //   console.warn(data)
    // })
    // console.warn(consumer.send('resr', 'game_state'))
    this.sessionService = SessionService;
    this.game = new Game(640, 480, Phaser.AUTO, 'board');
    this.stateHelper = new StateHelper(this.game);
    this.game.di = this;
    this.setupStates();
    this.stateHelper.setStateTo('WorldState')

  }

  setupStates() {
    this.game.state.add("BootState", new BootState());
    this.game.state.add("LoadingState", new LoadingState());
    this.game.state.add("TitleState", new TitleState());
    this.game.state.add("WorldState", new WorldState());
  }
}

function factory() {
  "ngInject";

  return new BoardDirective(...arguments);
}

export default factory;
