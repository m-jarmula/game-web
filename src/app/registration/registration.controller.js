class RegistrationCtrl {
    constructor($state, $auth) {
      "ngInject"

      this.auth = $auth;
      this.state = $state;
    }

    submitRegistration(registrationForm) {
      this.auth.submitRegistration(registrationForm)
      .then((resp) => {
        this.state.go('main');
      })
      .catch((resp) => {
        console.warn(resp)
      });
    }
}

export default RegistrationCtrl;
