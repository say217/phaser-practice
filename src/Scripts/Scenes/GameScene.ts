import * as Phaser from "phaser";
import MC from "../Objects/MC";
import FpsText from "../Objects/FpsText";
import { getResolution } from "../Utils/Util";

export default class GameScene extends Phaser.Scene {
  private fpsText: FpsText;
  private mc: MC;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private jumping: boolean;
  private mountainsBack: Phaser.GameObjects.TileSprite;
  private mountainsMid1: Phaser.GameObjects.TileSprite;
  private mountainsMid2: Phaser.GameObjects.TileSprite;
  private scoreText: Phaser.GameObjects.Text;
  private score: integer;
  private platformGroup: Phaser.GameObjects.Group;
  private platformPool: Phaser.GameObjects.Group;
  private ground: Phaser.Physics.Arcade.Sprite;

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

    //ground stuff
    this.ground = this.add.sprite(0, this.cameras.main.height, "tileUpper");

    // group with all active platforms.
    this.platformGroup = this.add.group({
      // once a platform is removed, it's added to the pool
      removeCallback: function (platform) {
        this.platformPool.add(platform);
      },
    });
    // pool
    this.platformPool = this.add.group({
      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback: function (platform) {
        this.platformGroup.add(platform);
      },
    });
    //Player Stuff
    this.mc = new MC(this, 200, 300);
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    //GUI Stuff
    this.fpsText = new FpsText(this);
    this.scoreText = this.add.text(
      this.cameras.main.width / 2,
      50,
      "SCORE: 0",
      {
        fontSize: 28,
        fontStyle: "Bold",
      }
    );
    this.scoreText.setOrigin(0.5, 0.5);

    //Score Logic
    this.score = 0;
    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.score += 10;
        this.scoreText.setText("SCORE: " + this.score);
      },
    });
  }

  update(): void {
    this.fpsText.update();
    this.movePlayer();

    this.mountainsBack.tilePositionX += 0.05;
    this.mountainsMid1.tilePositionX += 0.3;
    this.mountainsMid2.tilePositionX += 0.75;

    this.score;
  }

  movePlayer() {
    //Jumping
    if (this.cursorKeys.up.isDown) {
      if (!this.jumping) {
        this.mc.setVelocityY(-600);
        this.jumping = true;
        this.mc.play("jump");
      }
    }
    if (this.jumping && this.mc.body.velocity.y == 0) {
      this.jumping = false;
      this.mc.play("walk");
    }

    //Ducking
    if (this.cursorKeys.down.isDown) {
      if (!this.jumping) {
        this.jumping = true;
      }
    }
  }

  addPlatform(platformWidth, posX){
    let platform;
    if(this.platformPool.getLength()){
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    }
    else{
      platform = this.physics.add.sprite(posX, this.cameras.main.height*0.95, "tileUpper");
      platform.setImmovable = true;
      platform.visible = true;
      this.platformGroup.add(platform)
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
  }
}
