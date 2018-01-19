import angular from 'angular';

import HeaderDirective from './header/header.directive'
import ChatDirective from './chat/chat.directive'

let moduleName = 'directives';
let servicesModule = angular.module(moduleName, [])
  .directive('header', HeaderDirective)
  .directive('chat', ChatDirective)


export default moduleName;
