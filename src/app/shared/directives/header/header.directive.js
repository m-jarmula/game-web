class HeaderDirective {
  constructor() {
    this.restrict = 'AE';

    this.template = require('./header.tpl.html');
    this.scope = {}
    this.controller = HeaderDirectiveController
    this.controllerAs = 'CTRL'
  }
}

class HeaderDirectiveController {
  constructor(SessionService) {
    this.sessionService = SessionService;
    this.currentUser = SessionService.getCurrentUser();
  }

  logout() {
    this.sessionService.onLogout()
  }
}

function factory() {
  "ngInject";

  return new HeaderDirective(...arguments);
}

export default factory;
