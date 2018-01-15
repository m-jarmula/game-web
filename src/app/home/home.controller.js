class HomeCtrl {
  constructor(SessionService, UserService, $scope) {
    "ngInject";
    this.sessionService = SessionService;
    this.userService = UserService;
    this.currentUser = SessionService.currentUser;
    this.loadUser();
  }

  loadUser() {
    this.userService.get(this.currentUser.id).then((res) => {
      this.user = res.data;
    });
  }

  showBoard() {
    return this.user && this.user.player;
  }

  showPlayerSetup() {
    return this.user && !this.user.player;
  }

  savePlayer(playerForm) {
    this.userService.create(playerForm)
    .then((resp) => {
      this.user = resp.data;
    })
  }
}

export default HomeCtrl;
