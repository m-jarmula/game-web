import angular from 'angular';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/app.css';
import routing from './app.config'
import router from 'angular-ui-router';
import HomeCtrl from './home/home.controller';

angular.module('app', ['ui.router'])
  .config(routing)
  .controller('HomeCtrl', HomeCtrl);
