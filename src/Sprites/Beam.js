import Phaser from 'phaser';

export default class Beam extends Phaser.GameObjects.Sprite {
  constructor(scene, angle) {
    const x = scene.man.x;
    const y = scene.man.y;

    super(scene, x, y, 'beam');

    scene.add.existing(this);

    this.play('beam');
    scene.physics.world.enableBody(this);

    this.rotation = 90;

    if (angle === 'right') {
      this.body.velocity.x = 250;
    } else if (angle === 'left') {
      this.body.velocity.x = -250;
    } else if (angle === 'up') {
      this.body.velocity.y = -250;
    } else if (angle === 'down') {
      this.body.velocity.y = 250;
    }

    scene.projectiles.add(this);
  }

  update() {
    if (this.x < 32) {
      this.destroy();
    }
  }
}
