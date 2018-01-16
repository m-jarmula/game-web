import CurrentUser from '../shared/models/current-user'

class SessionService {
  constructor($rootScope, LocalStorageService) {
    this.localStorageService = LocalStorageService;
    this.currentUser = new CurrentUser(LocalStorageService.getItem('userData'))
    this.rootScope = $rootScope;
    this.bindEvents();
  }

  onLogin(user) {
    this.localStorageService.setItem('userData', user)
    this.currentUser.update(user)
  }

  onLogout() {
    this.localStorageService.setItem('userData', '')
    this.currentUser.update(null)
  }

  bindEvents() {
    this.rootScope.$on('auth:login-success', (ev, user) => {
      this.onLogin(user);
    });
    this.rootScope.$on('auth:login-error', (ev, user) => {
      this.onLogout();
    });
    this.rootScope.$on('auth:logout-success', (ev) => {
      this.onLogout();
    });
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

export default SessionService;
