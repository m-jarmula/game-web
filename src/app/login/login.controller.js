class LoginCtrl {
  constructor($scope, $auth, $state) {
    "ngInject";

    this.scope = $scope;
    this.auth = $auth;
    this.state = $state;
  }

  submitLogin(loginForm) {
    this.auth.submitLogin(loginForm)
    .then((resp) => {
      this.state.go('main');
    })
  }
}
export default LoginCtrl;
