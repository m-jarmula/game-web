import TitleState from '../../states/title.state';


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
  constructor(SessionService) {
    this.game = new Phaser.Game(640, 360, Phaser.AUTO, 'board');
    this.game.state.add("TitleState", new TitleState());
    this.game.state.start("TitleState");

  }
}

function factory() {
  "ngInject";

  return new BoardDirective(...arguments);
}

export default factory;
