import * as Phaser from "phaser";

export default class Score extends Phaser.GameObjects.Text {
  private score: number;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "SCORE: 0", {
      color: "white",
      fontSize: "28px",
      fontStyle: "Bold",
    });
    scene.add.existing(this);
    this.setOrigin(0.5, 0.5);

    //Score Logic
    this.score = 0;
    scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.score += 10;
        this.setText("SCORE: " + this.score);
      },
    });
  }

  getScore():number{
    return this.score;
  }

  incrementScore():void{
    this.score += 100;
    this.setText("SCORE: " + this.score);
  }
}
