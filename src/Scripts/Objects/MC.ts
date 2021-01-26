import * as Phaser from "phaser";

export default class MC extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");

    this.scene.add.existing(this);

    scene.physics.add.existing(this);

    this.setInteractive();

    this.setCollideWorldBounds();

    this.setGravity(0, 1000);

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key:'idle',
      frames: this.anims.generateFrameNumbers('player', {start: 0, end: 0}),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key:'duck',
      frames: this.anims.generateFrameNumbers('player', {start:6, end:6}),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key:'jump',
      frames: this.anims.generateFrameNumbers('player', {start:1, end:1}),
      frameRate: 6,
      repeat: -1
    })
    
    this.play('walk');
  }
}
