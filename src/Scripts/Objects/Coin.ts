import * as Phaser from "phaser";
import GameScene from "../Scenes/GameScene";
import Interactable from "./Interactable";

export default class Coin extends Interactable {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "coin");
  }

  onHit(): void {
    console.log("Coin");
    (this.scene as GameScene).getCoinSound().play();
    (this.scene as GameScene).getScoreObj().incrementScore();
    (this.scene as GameScene).getInteractableGroup().killAndHide(this);
    (this.scene as GameScene).getInteractableGroup().remove(this);
  }
}
