import * as Phaser from "phaser";
import MC from "../Objects/MC";
import FpsText from "../Objects/FpsText";
import Ground from "../Objects/Ground";
import Score from "../Objects/Score";
import Interactable from "../Objects/Interactable";
import Coin from "../Objects/Coin";
import Spike from "../Objects/Spike";

export default class GameScene extends Phaser.Scene {
  private fpsText: FpsText;
  private mc: MC;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private jumping: boolean;
  private mountainsBack: Phaser.GameObjects.TileSprite;
  private mountainsMid1: Phaser.GameObjects.TileSprite;
  private mountainsMid2: Phaser.GameObjects.TileSprite;
  private scoreText: Score;
  private groundLimit: number;
  private groundGroup: Phaser.GameObjects.Group;
  private interactableGroup: Phaser.GameObjects.Group;
  private interactablePool: Phaser.GameObjects.Group;

  constructor() {
    super({ key: "GameScene" });
  }

  create(): void {
    //BG Stuff
    this.mountainsBack = this.add.tileSprite(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      "mountains-back"
    );
    this.mountainsMid1 = this.add.tileSprite(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      "mountains-mid1"
    );
    this.mountainsMid2 = this.add.tileSprite(
      this.cameras.main.width / 2,
      this.cameras.main.height,
      this.cameras.main.width,
      this.cameras.main.height,
      "mountains-mid2"
    );

    //Ground Stuff
    this.groundLimit = this.cameras.main.width / 64 + 1;
    this.groundGroup = this.add.group();
    this.addGrounds();

    //Interactable Stuff
    this.interactableGroup = this.add.group({
      defaultKey: "interactable",
      maxSize: 3,
      removeCallback: function (interactable: Interactable) {
        (interactable.scene as GameScene).interactablePool.add(interactable);
      },
    });

    this.interactablePool = this.add.group({
      defaultKey: "interactable",
      maxSize: 3,
      removeCallback: function (interactable: Interactable) {
        (interactable.scene as GameScene).interactableGroup.add(interactable);
      },
    });

    //new Coin(this, (this.groundLimit*64)-32, this.cameras.main.height - 96)

    //this.interactablePool.add();
    this.interactableGroup.add(new Spike(this, (this.groundLimit*64)-32, this.cameras.main.height - 96))

    //Player Stuff
    this.mc = new MC(this, 200, 300);
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    //GUI Stuff
    this.fpsText = new FpsText(this);
    this.scoreText = new Score(this, this.cameras.main.width / 2, 50);
  }

  update(): void {
    //enable jump
    this.physics.collide(
      this.mc,
      this.groundGroup,
      function (mc, ground) {
        if (this.jumping) {
          this.jumping = false;
          this.mc.play("walk");
        }
      },
      null,
      this
    );

    //obstacle or coin collision 
    this.physics.overlap(
      this.mc,
      this.interactableGroup,
      function (mc, interactable: Interactable) {
        console.log("masuk 1");
        switch (interactable.IsObstacle()) {
          case false:
            //is a Coin
            console.log("masuk coin");
            this.scoreText.incrementScore();
            this.interactableGroup.killAndHide(interactable);
            this.interactableGroup.remove(interactable);
          case true:
            //is an Obstacle
            console.log("masuk obstacle")
            this.physics.pause();
          }
      },
      null,
      this
    );

    this.fpsText.update();

    this.mountainsBack.tilePositionX += 0.05;
    this.mountainsMid1.tilePositionX += 0.3;
    this.mountainsMid2.tilePositionX += 0.75;

    this.movePlayer();
    this.mc.update();
  }

  movePlayer(): void {
    //Jumping
    if (this.cursorKeys.up.isDown) {
      if (!this.jumping) {
        this.mc.setVelocityY(-600);
        this.jumping = true;
        this.mc.play("jump");
      }
    }
  }

  addGrounds(): void {
    for (let i = 0; i < this.groundLimit; i++) {
      this.groundGroup.add(
        new Ground(this, i * 64 + 32, this.cameras.main.height - 32)
      );
    }
  }

  getGroundLimit(): number {
    return this.groundLimit;
  }

  // addInteractable(): void {
  //   let interactable: Interactable;
  //   if(this.interactablePool.getLength()){
  //     interactable = this.interactablePool.getFirstNth(Phaser.Math.Between(0,this.interactablePool.getLength()-1));
  //     interactable.x = (this.groundLimit * 64)-32;
  //     interactable.active = true;
  //     interactable.visible = true;
  //     this.interactablePool.remove(interactable);
  //   }
  //   else{
  //     console.log("xxx")
  //     this.interactablePool.add(new Coin(this, -32, this.cameras.main.height - 96));
  //     let interactable = this.interactablePool.getFirst();
  //     console.log(interactable.x);
  //     //this.interactablePool.add(new Spike(this, -64, this.cameras.main.height - 64));

  //   }
  // }
}
