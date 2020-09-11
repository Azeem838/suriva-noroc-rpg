import 'phaser';
import config from './Config/config';
import BootScene from './Scenes/BootScene';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Boot', BootScene);
  }
}

window.game = new Game();
