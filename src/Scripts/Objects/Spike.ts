import * as Phaser from "phaser";
import Interactable from "../Objects/Interactable"

export default class Ground extends Interactable {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "tileObstacleJump", true);
  }
}
