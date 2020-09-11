import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // Game
    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 100,
      'yellowButton',
      'yellowButton',
      'Play',
      100,
      'Game',
    ).setScale(0.2);

    // Options
    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      'yellowButton',
      'yellowButton',
      'Options',
      100,
      'Options',
    ).setScale(0.2);

    // Credits
    this.creditsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      'yellowButton',
      'yellowButton',
      'Credits',
      100,
      'Credits',
    ).setScale(0.2);

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        config.width / 2,
        config.height / 2 - offset * 100,
        config.width,
        config.height,
      ),
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton);
  }
}
