import Phaser from 'phaser';
import Button from '../Objects/Button';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.add.image(game.config.width / 2, 100, 'logo');

    // const { user } = this.sys.game.globals.model;
    this.add.text(game.config.width / 2 - 200, 200, 'Game Over', {
      fontFamily: 'monospace',
      fontSize: 40,
      fontStyle: 'bold',
      color: '#ffb132',
      align: 'center',
    });

    this.add.text(game.config.width / 2 - 200, 300, 'Your score:', {
      fontFamily: 'monospace',
      fontSize: 20,
      fontStyle: 'bold',
      color: '#ffb132',
      align: 'center',
    });

    this.homeButton = new Button(
      this,
      game.config.width / 2,
      game.config.height - 100,
      'yellowButton',
      'yellowButton',
      'Menu',
      100,
      'Title',
    ).setScale(0.2);

    this.restartButton = new Button(
      this,
      game.config.width / 2,
      game.config.height - 20,
      'yellowButton',
      'yellowButton',
      'Restart',
      100,
      'Game',
    ).setScale(0.2);
  }
}
