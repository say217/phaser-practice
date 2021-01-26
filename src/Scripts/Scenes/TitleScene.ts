import * as Phaser from "phaser";
import FpsText from "../Objects/FpsText";
import { getResolution } from "../Utils/Util";


export default class TitleScene extends Phaser.Scene {
  private fpsText: FpsText;

  constructor() {
    super({ key: "TitleScene" });
  }

  create(): void {
    this.fpsText = new FpsText(this);
    const titleText = this.add.text(getResolution().width/2, getResolution().height/2, "Welcome to Unnamed Runner!");
    titleText.setOrigin(0.5, 0.5)
    const titleText2 = this.add.text(getResolution().width/2, getResolution().height/2 + 50, "Press Any Key To Continue");
    titleText2.setOrigin(0.5, 0.5)
  }

  update(): void {
    this.fpsText.update();

    this.input.keyboard.on("keyup", function(event){
      this.scene.start("GameScene");
    });
  }
}
