global.Phaser = require('phaser');

class UserInputPlugin extends Phaser.Plugin {
  constructor(game, parent) {
    super(game, parent);
  }

  init(gameState) {
    this.gameState = gameState;

    this.game.input.keyboard.addCallbacks(this, this.processInput, this.processInput, null);
    this.enabled = false;
  }

  setInput(userInputData) {
    this.userInputs = { 'keydown': {}, 'keyup': {} };

    for(var inputType in userInputData) {
      for(var key in userInputData[inputType]) {
        var keyCode = Phaser.Keyboard[key];
        this.userInputs[inputType][keyCode] = userInputData[inputType][key];
      }
    }

    this.enabled = true;
  }

  processInput(event) {
    if(!this.enabled)
      return;
    var context, method;
    var userInput = this.userInputs[event.type][event.keyCode];
    if(userInput) {
      var callbackData = userInput.callback.split('.');
      if(callbackData[0] === 'gameState'){
        context = this.gameState;
      } else {
        context = this.gameState.prefabs[callbackData[0]];
      }
      method = context[callbackData[1]];
      method.apply(context, userInput.args);
    }
  }
}

export default UserInputPlugin;
