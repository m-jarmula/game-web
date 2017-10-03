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
}
export default TitleState;
