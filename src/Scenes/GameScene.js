import Phaser from 'phaser';
import PlayerSprite from '../Sprites/PlayerSprite';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.anims.create({
      key: 'right',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('man', {
        frames: [11, 12, 13],
      }),
    });

    this.anims.create({
      key: 'left',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('man', {
        frames: [8, 9, 10],
      }),
    });

    this.anims.create({
      key: 'up',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('man', {
        frames: [4, 5, 6, 7],
      }),
    });

    this.anims.create({
      key: 'down',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('man', {
        frames: [0, 1, 2, 3],
      }),
    });

    this.load.image('terrain', '../src/assets/images/terrain-atlas.png');
    this.load.image('items', '../src/assets/images/items.png');

    this.load.tilemapTiledJSON('world', '../src/assets/maps/world.json');
  }

  create() {
    this.man = new PlayerSprite(this, 100, 100, 'man', 0);
    this.man.setSize(150, 210).setOffset(50, 20);
    this.man.setCollideWorldBounds(true);

    this.keyboard = this.input.keyboard.addKeys('W, A, S, D');
  }

  update(time, delta) {
    if (this.keyboard.D.isDown === true) {
      this.man.setVelocityX(64);
    }

    if (this.keyboard.A.isDown === true) {
      this.man.setVelocityX(-64);
    }

    if (this.keyboard.W.isDown === true) {
      this.man.setVelocityY(-64);
    }

    if (this.keyboard.S.isDown === true) {
      this.man.setVelocityY(64);
    }

    if (this.keyboard.A.isUp && this.keyboard.D.isUp) {
      this.man.setVelocityX(0);
    }

    if (this.keyboard.W.isUp && this.keyboard.S.isUp) {
      this.man.setVelocityY(0);
    }

    if (this.man.body.velocity.x > 0) {
      this.man.play('right', true);
    } else if (this.man.body.velocity.x < 0) {
      this.man.play('left', true);
    } else if (this.man.body.velocity.y < 0) {
      this.man.play('up', true);
    } else if (this.man.body.velocity.y > 0) {
      this.man.play('down', true);
    }
  }
}
