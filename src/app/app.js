import angular from 'angular';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/app.css';
import router from '@uirouter/angularjs';
import ngStorage from 'ngstorage'
import ipCookie from 'angular-cookie';
import ngTokenAuth from 'ng-token-auth';
// Modules
import ServicesModule from './services'
import DirectivesModule from './shared/directives'
// Controllers
import HomeCtrl from './home/home.controller';
import LoginCtrl from './login/login.controller';
import RegistrationCtrl from './registration/registration.controller';


import run from './run';
import routing from './app.config';
angular.module('app', [ServicesModule, DirectivesModule, 'ui.router', 'ngStorage', 'ng-token-auth', 'ipCookie'])
  .run(run)
  .config(routing)
  .controller('HomeCtrl', HomeCtrl)
  .controller('RegistrationCtrl', RegistrationCtrl)
  .controller('LoginCtrl', LoginCtrl);
