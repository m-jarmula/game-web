import angular from 'angular';

import Interceptor from './interceptor.service';
import SessionStorageService from './storage/session-storage.service';
import LocalStorageService from './storage/local-storage.service';
import SessionService from './session.service';
import WebSocketService from './websocket.service';
import UserService from './user.service';

let moduleName = 'services';

let servicesModule = angular.module(moduleName, [])
  .service('SessionStorageService', SessionStorageService)
  .service('LocalStorageService', LocalStorageService)
  .service('SessionService', SessionService)
  .service('WebSocketService', WebSocketService)
  .service('UserService', UserService)
  .factory('Interceptor', Interceptor)

export default moduleName;
