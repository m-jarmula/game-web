import angular from 'angular';

import HeaderDirective from './header/header.directive'

let moduleName = 'directives';
let servicesModule = angular.module(moduleName, [])
  .directive('header', HeaderDirective)


export default moduleName;
