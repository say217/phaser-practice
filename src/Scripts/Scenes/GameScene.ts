import * as Phaser from "phaser";
import Shopee from "../Objects/Shopee"
import FpsText from "../Objects/FpsText";


export default class GameScene extends Phaser.Scene {

  private fpsText:FpsText;

  constructor() {
    super({ key: "GameScene" });
  }

  preload(): void 
  {
     
  }

  create(): void 
  {
      this.fpsText = new FpsText(this);
      new Shopee(this, this.cameras.main.width/2, this.cameras.main.height/2);
  }

  update(): void 
  {
    this.fpsText.update();
  }
}
