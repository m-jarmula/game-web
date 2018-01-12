import API_URLS from '../../../API';

class StateHelper {
  constructor(game) {
    this.game = game;
  }

  setStateTo(stateName) {
    var stateUrl = this.stateMapper()[stateName];

    this.game.state.start("BootState", true, false, this.stateUrlFor(stateUrl), stateName);
  }

  stateUrlFor(stateType) {
    return API_URLS['STATES'] + stateType + '.json';
  }

  stateMapper() {
    return {
      'TitleState': 'title',
      'WorldState': 'town'
    }
  }
}

export default StateHelper;
