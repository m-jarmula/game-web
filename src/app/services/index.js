import angular from 'angular';

import Interceptor from './interceptor.service';
import SessionStorageService from './storage/session-storage.service';
import LocalStorageService from './storage/local-storage.service';
import SessionService from './session.service';
import PhaserService from './phaser.service';

let moduleName = 'services';

let servicesModule = angular.module(moduleName, [])
  .service('SessionStorageService', SessionStorageService)
  .service('LocalStorageService', LocalStorageService)
  .service('SessionService', SessionService)
  .service('PhaserService', PhaserService)
  .factory('Interceptor', Interceptor)

export default moduleName;
