import * as Phaser from "phaser";
import GameScene from "../Scenes/GameScene"
import Interactable from "../Objects/Interactable"

export default class Coin extends Interactable {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "coin", false);
   }
}
