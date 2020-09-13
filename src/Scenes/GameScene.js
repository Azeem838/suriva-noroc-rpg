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
    this.load.image('mushroom', '../src/assets/images/mushroom.png');

    this.load.tilemapTiledJSON('world', '../src/assets/maps/world.json');
  }

  create() {
    this.man = new PlayerSprite(this, 100, 100, 'man', 0);
    this.man.setSize(150, 210).setOffset(50, 20);
    this.man.setCollideWorldBounds(true);

    this.keyboard = this.input.keyboard.addKeys('W, A, S, D');

    const world = this.add.tilemap('world');

    const terrain = world.addTilesetImage('terrain-atlas', 'terrain');
    const itemset = world.addTilesetImage('items');

    const botLayer = world
      .createStaticLayer('bot', [terrain], 0, 0)
      .setDepth(-1);
    const topLayer = world.createStaticLayer('top', [terrain], 0, 0);

    this.physics.add.collider(this.man, topLayer);
    topLayer.setCollisionByProperty({ collides: true });

    const objLayer = world.getObjectLayer('items').objects;
    const mushroomLayer = objLayer.filter(
      (obj) => obj.gid === 1019 && obj.properties,
    );

    const mushrooms = this.physics.add.staticGroup();

    mushroomLayer.forEach((object) => {
      const obj = mushrooms.create(object.x, object.y, 'mushroom');
      obj.body.width = object.width;
      obj.body.height = object.height;
    });

    this.cameras.main.startFollow(this.man);
    this.physics.world.setBounds(
      0,
      0,
      world.widthInPixels,
      world.heightInPixels,
    );
  }

  update(time, delta) {
    if (this.keyboard.D.isDown === true) {
      this.man.setVelocityX(128);
    }

    if (this.keyboard.A.isDown === true) {
      this.man.setVelocityX(-128);
    }

    if (this.keyboard.W.isDown === true) {
      this.man.setVelocityY(-128);
    }

    if (this.keyboard.S.isDown === true) {
      this.man.setVelocityY(128);
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
