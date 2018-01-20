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
  constructor(SessionService, $rootScope) {
    this.rootScope = $rootScope;
    this.sessionService = SessionService;
    this.currentUser = SessionService.getCurrentUser();
  }

  logout() {
    this.sessionService.onLogout()
  }

  chatToggle() {
    this.rootScope.$broadcast('chat.state.changed');
    // this.rootScope.$emit('chat.state.changed');
  }
}

function factory() {
  "ngInject";

  return new HeaderDirective(...arguments);
}

export default factory;
