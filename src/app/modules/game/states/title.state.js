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
    this.game.state.start('BootState', true, false, 'states/town.json', 'WorldState');
  }
}
export default TitleState;
