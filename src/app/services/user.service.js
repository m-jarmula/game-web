import API_URLS from '../API'

class UserService {
  constructor($http) {
    "ngInject";
    this.$http = $http;
  }

  get(id) {
    return this.$http({
      method: 'GET',
      dontShowGlobalAjaxLoader: true,
      url: API_URLS.USERS + id
    });
  }

  create(data) {
    return this.$http({
      method: 'POST',
      url: API_URLS.PLAYERS,
      data: data
    });
  }

}
export default UserService;
