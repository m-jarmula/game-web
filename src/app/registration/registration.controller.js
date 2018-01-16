class RegistrationCtrl {
    constructor($state, $auth, SessionService) {
      "ngInject"

      this.auth = $auth;
      this.state = $state;
      this.sessionService = SessionService;
    }

    submitRegistration(registrationForm) {
      this.auth.submitRegistration(registrationForm)
      .then((resp) => {
        this.sessionService.onLogin(resp.data)
        this.state.go('main');
      })
      .catch((resp) => {
        console.warn(resp)
      });
    }
}

export default RegistrationCtrl;
