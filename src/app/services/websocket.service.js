class WebSocketService {
  constructor($websocket, SessionService) {
    // debugger;
    this.ws = new $websocket('ws://localhost:2345');
    this.currentUser = SessionService.currentUser;
    this.joinChannel('test');
  }

  joinChannel(channelName) {
    this.send({
      event_type: 'join_channel',
      channel: channelName,
      user_id: this.currentUser.id
    });
  }

  send(message) {
    this.ws.send(JSON.stringify(message))
  }
}

export default WebSocketService;
