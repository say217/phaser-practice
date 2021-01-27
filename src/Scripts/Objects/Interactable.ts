import * as Phaser from "phaser";

export default class Interactable extends Phaser.Physics.Arcade.Sprite {
  private isObstacle: boolean;
  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string, isObstacle: boolean) {
    super(scene, x, y, sprite);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.isObstacle = isObstacle;
    this.setVelocityX(-200);
    this.setImmovable(true);
    this.setFriction(0);
  }

  IsObstacle(){
    return this.isObstacle;
  }
}
