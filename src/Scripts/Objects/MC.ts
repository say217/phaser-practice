import * as Phaser from "phaser";
import GameScene from "../Scenes/GameScene";

export default class MC extends Phaser.Physics.Arcade.Sprite {
  private jumping: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");

    this.scene.add.existing(this);

    this.scene.physics.add.existing(this);

    this.setInteractive();

    this.setCollideWorldBounds();

    this.setGravity(0, 1000);

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", { start: 2, end: 3 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 0 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "duck",
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 6 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player", { start: 1, end: 1 }),
      frameRate: 6,
      repeat: -1,
    });

    //Initial Player State
    this.jumping = true;
    this.play("walk");

    //Player Jump Control
    this.scene.input.keyboard.on(
      "keydown-UP",
      (event: any) => {
        if (!this.jumping) {
          console.log("jumping");
          this.setVelocityY(-600);
          this.jumping = true;
          this.play("jump");
          (this.scene as GameScene).getJumpSound().play();
        }
      },
      this
    );
  }

  //Set-Get Jump State
  getJumpingState(): boolean {
    return this.jumping;
  }

  setJumpingState(state: boolean): void {
    this.jumping = state;
  }
}
