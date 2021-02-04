import * as Phaser from "phaser";
import GameScene from "../Scenes/GameScene";

export default abstract class Interactable extends Phaser.Physics.Arcade.Sprite {
  private isObstacle: boolean;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    sprite: string,
  ) {
    super(scene, x, y, sprite);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setVelocityX(-200);
    this.setImmovable(true);
    this.setFriction(0);
    this.setActive(false);
    this.setVisible(false);
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  abstract onHit() : void;

  update() {
    if (this.x <= -32) {
      let objectGroup = (this.scene as GameScene).getInteractableGroup();
      if (objectGroup.getChildren().indexOf(this) > -1) {
        objectGroup.killAndHide(this);
        objectGroup.remove(this);
      }
    }
  }

  removeUpdateListener() {
    this.scene.events.removeListener(
      Phaser.Scenes.Events.UPDATE,
      this.update,
      this
    );
  }
}
