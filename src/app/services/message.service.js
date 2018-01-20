import API_URLS from '../API'

class MessageService {
  constructor($http) {
    "ngInject";
    this.$http = $http;
  }

  getList() {
    return this.$http({
      method: 'GET',
      dontShowGlobalAjaxLoader: true,
      url: API_URLS.MESSAGES
    });
  }
}
export default MessageService;
