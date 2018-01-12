import JsonState from './json.state';
import SpritePrefab from '../prefabs/sprite.prefab';
import TextPrefab from '../prefabs/text.prefab';

class TitleState extends JsonState {
  constructor() {
    super();
    this.prefabClasses = {
      background: SpritePrefab,
      text: TextPrefab
    }
  }

  startGame() {
    var stateUrl = this.game.di.stateHelper.stateUrlFor('town');
    this.game.state.start('BootState', true, false, stateUrl, 'WorldState');
  }
}
export default TitleState;
