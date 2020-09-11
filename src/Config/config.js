import Phaser from 'phaser';

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

export default {
  type: Phaser.AUTO,
  parent: 'phaser-game',
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
};
