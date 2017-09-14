import Storage from './storage';

class SessionStorageService extends Storage {
  constructor($sessionStorage) {
    super();
    this.sessionProvider = $sessionStorage;
  }
}

export default SessionStorageService;
