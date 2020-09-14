import Phaser from 'phaser';
import Button from '../Objects/Button';

export default class InstructionScene extends Phaser.Scene {
  constructor() {
    super('Instruction');
  }

  create() {
    this.add.image(game.config.width / 2, 100, 'logo');

    this.textInstructions = this.add.text(
      210,
      270,
      'How to Play:' +
        '\nW, A, S, D to move the player' +
        '\nUse the space key to attack the Virus!',
      { fontSize: 20 },
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

    this.intro = this.add.text(215, 400, 'Enter your name: ', {
      fontSize: 20,
      fontFamily: 'monospace',
    });

    const input = this.add.dom(480, 410, 'input', {
      type: 'text',
      name: 'nameField',
      fontSize: '32px',
      backgroundColor: '#fff',
      border: '1px solid white',
    });
    input.scaleX = 5;
    input.scaleY = 5;
    console.log(this.dom);

    const style =
      'background: url(../src/assets/ui/yellow-button2.png); border: none; border-radius: 5px; color: #fff;';
    const gameButton = this.add.dom(600, 412, 'button', style, 'Play');
    gameButton.scaleX = 5;
    gameButton.scaleY = 5;
    gameButton.addListener('click');

    gameButton.on('click', () => {
      if (input.node.value) {
        this.model = this.sys.game.globals.model;
        this.model.user = input.node.value;
        this.scene.start('Game');
      }
    });
  }
}
