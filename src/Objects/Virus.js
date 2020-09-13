import Phaser from 'phaser';

export default class Virus extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.scene = scene;
    // this.id = id;
    // this.health = health;
    // this.maxHealth = maxHealth;
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);

    this.setImmovable(false);
    this.body.velocity.x = -Phaser.Math.Between(50, 100);
    this.setScale(2);
    this.setCollideWorldBounds(true);
    // this.scene.add.existing(this);
    // this.setOrigin(0);
    // this.setDepth(20);
    // this.createHealthBar();
  }
}
