export default function routing($urlRouterProvider, $locationProvider, $stateProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state({
      name: 'main',
      url: '/',
      data: {
        public: true
      },
      template: require('./home/home.html'),
      controller: 'HomeCtrl',
      controllerAs: 'CTRL'
    });

  $urlRouterProvider.otherwise('/');
}
