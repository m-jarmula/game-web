function httpInerceptor($rootScope, $q, $state) {
	"ngInject";

  return {
    responseError(rejection) {
      let status = rejection.status;

      switch(status) {
        default: {
          $state.go('login');
          return $q.reject(rejection);
        }
      }
    }
  }
}

export default httpInerceptor;
