import * as Phaser from "phaser";
import GameScene from "../Scenes/GameScene";

export default class Ground extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "tileUpper");
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setVelocityX(-200);
    this.setImmovable(true);
    this.setFriction(0);
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    if (this.x <= -32) {
      this.x += (this.scene as GameScene).getGroundLimit() * 64;
    }
  }
}
