import * as Phaser from "phaser";
import Interactable from "./Interactable";
import GameScene from "../Scenes/GameScene";

export default class Spike extends Interactable {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "tileObstacleJump");
    this.setSize(64, 32);
  }
  onHit(): void {
    console.log("Spike");
    (this.scene as GameScene).getStabSound().play();
    (this.scene as GameScene).pauseAll();
  }
}
