import API_URLS from './API';
export default function routing($urlRouterProvider, $locationProvider, $stateProvider, $authProvider, $httpProvider, $qProvider) {
  $authProvider.configure({
    apiUrl: API_URLS['ROOT'],
    validateOnPageLoad: false,
  });
  $qProvider.errorOnUnhandledRejections(false);
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
	$httpProvider.interceptors.push('Interceptor');

  $stateProvider
    .state({
      name: 'main',
      url: '/',
      data: {
        public: true
      },
      template: require('./home/home.html'),
      controller: 'HomeCtrl',
      controllerAs: 'CTRL',
      resolve: {
        auth: ($auth, $location, $state) => {
          return $auth.validateUser().catch((err) => {
            $state.go('login');
          });
        }
      }
    })
    .state({
      name: 'login',
      url: '/login',
      controller: 'LoginCtrl',
      controllerAs: 'CTRL',
      data: {
        public: true
      },
      template: require('./login/login.html')
    })
    .state({
      name: 'register',
      url: '/register',
      controller: 'RegistrationCtrl',
      controllerAs: 'CTRL',
      data: {
        public: true
      },
      template: require('./registration/registration.html')
    })
}
