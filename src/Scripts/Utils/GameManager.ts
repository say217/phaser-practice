import * as Phaser from "phaser";
import Ground from "../Objects/Ground";
import Interactable from "../Objects/Interactable";
import MC from "../Objects/MC";
import GameScene from "../Scenes/GameScene";

export default class GameManager {
  private scene: GameScene;
  private bg: Phaser.GameObjects.TileSprite[];

  constructor(scene: GameScene) {
    this.scene = scene;
    this.bg = this.scene.getBG();
  }

  collisionEvent(): void{
    // Collision to Enable Jump
    this.scene.physics.collide(
      this.scene.getMC(),
      this.scene.getGroundGroup(),
      (mc: MC, ground: Ground) => {
        if (mc.getJumpingState()) {
          mc.setJumpingState(false);
          mc.play("walk");
        }
      },
      null,
      this
    );

    //obstacle or coin collision
    this.scene.physics.overlap(
      this.scene.getMC(),
      this.scene.getInteractableGroup(),
      (mc: MC, interactable: Interactable) => {
        console.log("Interacting");
        interactable.onHit();
      },
      null,
      this
    );
  }

  moveBG(): void{
    this.bg[0].tilePositionX += 0.05;
    this.bg[1].tilePositionX += 0.3;
    this.bg[2].tilePositionX += 0.75;
  }
}
