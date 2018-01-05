import TitleState from '../../states/title.state';
import BootState from '../../states/boot.state';
import LoadingState from '../../states/loading.state';
import WorldState from '../../states/world.state';


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
  constructor(SessionService, ActionCableChannel) {
    this.game = new Phaser.Game(640, 480, Phaser.AUTO, 'board');
    this.game.state.add("BootState", new BootState());
    this.game.state.add("LoadingState", new LoadingState());
    this.game.state.add("TitleState", new TitleState());
    this.game.state.add("WorldState", new WorldState());
    this.game.state.start("BootState", true, false, 'states/title.json', 'TitleState');
  }
}

function factory() {
  "ngInject";

  return new BoardDirective(...arguments);
}

export default factory;
