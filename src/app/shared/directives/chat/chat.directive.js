class ChatDirective {
  constructor() {
    this.restrict = 'AE';

    this.template = require('./chat.tpl.html');
    this.scope = {
      user: '='
    };
    this.controller = ChatDirectiveController;
    this.controllerAs = 'CTRL';
  }
}

class ChatDirectiveController {
  constructor($rootScope, WebSocketService, $scope, MessageService) {
    this.isOpen = false;
    this.scope = $scope;
    this.messageService = MessageService;
    $rootScope.$on('chat.state.changed', (data) => { this.toggleChat() });
    this.ws = WebSocketService;
    this.joinMessageChannel(this);
    this.chatWindow = document.getElementById('chat');
    this.getMessages();
  }

  toggleChat() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.scrollDownChatWindow();
    this.isOpen = true;
  }

  close() {
    this.scrollDownChatWindow();
    this.isOpen = false;
  }

  getMessages() {
    this.messageService.getList().then((res) => {
      this.messages = res.data
    });
  }

  sendMessage(message) {
    this.ws.send(
      'ChatChannel',
      {
        player_name: this.scope.user.player.name,
        message: message.body
      }
    )
    message.body = '';
  }

  scrollDownChatWindow() {
    var chatWindow = document.getElementById('chat');
    var positionToScroll = chatWindow.offsetHeight;
    chatWindow.scrollTop = positionToScroll;
  }

  joinMessageChannel(that) {
    this.messagetSubscription = this.ws.joinChannel('ChatChannel', (data) => {
      this.messages.push(data);
      this.scrollDownChatWindow();
    });
  }
}

function factory() {
  "ngInject";

  return new ChatDirective(...arguments);
}

export default factory;
