import * as Phaser from "phaser";

export default class Shopee extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "happy");

    this.scene.add.existing(this);

    scene.physics.add.existing(this);

    this.setInteractive();

    this.setCollideWorldBounds();

    this.setGravity(0, 1000);

    this.setVelocity(200);

    this.on("pointerdown", function () {
      this.setVelocity(0, -650);
    });
  }
}
