import angular from 'angular';

import Interceptor from './interceptor.service';
import SessionStorageService from './storage/session-storage.service';
import LocalStorageService from './storage/local-storage.service';
import SessionService from './session.service';
import WebSocketService from './websocket.service';

let moduleName = 'services';

let servicesModule = angular.module(moduleName, [])
  .service('SessionStorageService', SessionStorageService)
  .service('LocalStorageService', LocalStorageService)
  .service('SessionService', SessionService)
  .service('WebSocketService', WebSocketService)
  .factory('Interceptor', Interceptor)

export default moduleName;
