import Phaser from 'phaser';
import Button from '../Objects/Button';
import config from '../Config/config';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });

    this.musicButton = this.add
      .image(config.width / 2, 200, 'yellowButton')
      .setScale(0.2);
    this.musicText = this.add.text(
      config.width / 2 - 90,
      190,
      'Music Enabled',
      {
        fontSize: 24,
      },
    );

    this.soundButton = this.add
      .image(config.width / 2, 300, 'yellowButton')
      .setScale(0.2);
    this.soundText = this.add.text(
      config.width / 2 - 90,
      290,
      'Sound Enabled',
      {
        fontSize: 24,
      },
    );

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on(
      'pointerdown',
      function () {
        this.model.musicOn = !this.model.musicOn;
        this.updateAudio();
      }.bind(this),
    );

    this.soundButton.on(
      'pointerdown',
      function () {
        this.model.soundOn = !this.model.soundOn;
        this.updateAudio();
      }.bind(this),
    );

    this.menuButton = new Button(
      this,
      400,
      500,
      'yellowButton',
      'yellowButton',
      'Menu',
      100,
      'Title',
    ).setScale(0.2);

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('yellowButton');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }

    if (this.model.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('yellowButton');
    }
  }
}
