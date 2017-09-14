import Storage from './storage';

class LocalStorageService extends Storage {
  constructor($localStorage) {
    super();
    this.sessionProvider = $localStorage;
  }
}

export default LocalStorageService;
