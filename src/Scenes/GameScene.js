import Phaser from 'phaser';
import PlayerSprite from '../Sprites/PlayerSprite';
import Beam from '../Sprites/Beam';
import Virus from '../Objects/Virus';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.angle = 'down';
    this.score = 0;
    this.currentWave = 1;
    this.virusAmount = 0;
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

    this.load.spritesheet('beam', '../src/assets/spritesheets/beam.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.image('virus', '../src/assets/images/coronavirus.png');

    this.load.bitmapFont(
      'pixelFont',
      '../src/assets/font/font.png',
      '../src/assets/font/font.xml',
    );
  }

  create() {
    this.man = new PlayerSprite(this, 100, 100, 'man', 0);
    this.man.setSize(150, 210).setOffset(50, 20);
    this.man.setCollideWorldBounds(true);

    this.keyboard = this.input.keyboard.addKeys('W, A, S, D, SPACE');

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

    this.mushrooms = this.physics.add.staticGroup();

    mushroomLayer.forEach((object) => {
      const obj = this.mushrooms.create(object.x, object.y, 'mushroom');
      obj.properties = object.properties;
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

    this.projectiles = this.add.group();

    this.anims.create({
      key: 'beam',
      frames: this.anims.generateFrameNumbers('beam'),
      frameRate: 20,
      repeat: -1,
    });

    this.virusGroup = this.add.group();
    this.spawnVirus(10);

    this.physics.add.overlap(
      this.projectiles,
      this.virusGroup,
      this.shootVirus,
      null,
      this,
    );

    this.physics.add.overlap(
      this.man,
      this.virusGroup,
      this.hurtMan,
      null,
      this,
    );

    this.scoreLabel = this.add
      .bitmapText(10, 5, 'pixelFont', 'SCORE: 0', 40)
      .setScrollFactor(0, 0);
    this.healthLabel = this.add
      .bitmapText(10, 50, 'pixelFont', 'HEALTH: 100/100', 40)
      .setScrollFactor(0, 0);
  }

  update(time, delta) {
    this.physics.overlap(
      this.man,
      this.mushrooms,
      this.restoreHealth,
      null,
      this,
    );

    if (this.keyboard.D.isDown === true) {
      this.man.setVelocityX(128);
      this.angle = 'right';
    }

    if (this.keyboard.A.isDown === true) {
      this.man.setVelocityX(-128);
      this.angle = 'left';
    }

    if (this.keyboard.W.isDown === true) {
      this.man.setVelocityY(-128);
      this.angle = 'up';
    }

    if (this.keyboard.S.isDown === true) {
      this.man.setVelocityY(128);
      this.angle = 'down';
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

    if (Phaser.Input.Keyboard.JustDown(this.keyboard.SPACE)) {
      this.shootBeam(this.angle);
    }

    for (let i = 0; i < this.projectiles.getChildren().length; i += 1) {
      const beam = this.projectiles.getChildren()[i];
      beam.update(this);
    }

    if (this.virusAmount === 0) {
      this.spawnVirus(10);
      this.currentWave += 1;
    }
  }

  restoreHealth(man, obj) {
    if (man.hp + obj.properties[0].value >= 100) {
      this.man.hp = 100;
    } else {
      this.man.hp += obj.properties[0].value;
    }

    this.healthLabel.text = `HEALTH: ${this.man.hp}/100`;
    obj.destroy();
  }

  shootBeam(angle) {
    const beam = new Beam(this);
  }

  shootVirus(projectile, virus) {
    projectile.destroy();
    virus.destroy();
    this.score += 5;
    this.scoreLabel.text = `SCORE: ${this.score}`;
    this.virusAmount -= 1;
  }

  hurtMan(man, virus) {
    if (man.hurt) {
      return;
    }
    man.hurt = true;

    this.time.addEvent({
      delay: 2000,
      callback: this.resetHurtTime,
      callbackScope: this,
    });
    man.alpha = 0.5;
    this.man.hp -= 10;

    if (man.hp < 1) {
      this.gameOver();
    }

    this.healthLabel.text = `HEALTH: ${this.man.hp}/100`;
  }

  resetHurtTime() {
    this.man.alpha = 1;
    this.man.hurt = false;
  }

  gameOver() {
    this.scene.start('GameOver');
  }

  spawnVirus(amount) {
    for (let i = 0; i < amount; i += 1) {
      this.virus = new Virus(
        this,
        this.physics.world.bounds.width,
        Phaser.Math.Between(0, this.physics.world.bounds.width),
        'virus',
        0,
      );
      this.virusAmount += 1;
    }
  }
}
