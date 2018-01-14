class WebSocketService {
  constructor(ActionCableChannel, SessionService) {
    this.currentUser = SessionService.currentUser;
    this.actionCableChannel = ActionCableChannel;
    this.channels = {};
  }

  joinChannel(channel, onMessage) {
    var consumer = new this.actionCableChannel(channel);
    this.channels[channel] = consumer;
    return consumer.subscribe(onMessage);
  }

  send(channel, message) {
    this.channels[channel].send(message);
  }
}

export default WebSocketService;
