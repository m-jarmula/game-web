class CurrentUser {
  constructor(userData) {
    this.update(userData);
  }

  update(userData) {
    this.firstName = userData ? userData.first_name : null;
    this.lastName = userData ? userData.last_name : null;
    this.id = userData ? userData.id : null;
    this.uid = userData ? userData.uid : null;
    this.isLoggedIn = userData ? true : false;
  }
}

export default CurrentUser;
