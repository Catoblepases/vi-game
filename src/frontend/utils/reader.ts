import { CONST } from "../const/const";

export function speak(msg: string) {
  let ssu = new window.SpeechSynthesisUtterance();
  ssu.voice = window.speechSynthesis.getVoices()[1];
  ssu.lang = "en-US";
  ssu.rate = 1.7;
  ssu.text = msg;
  ssu.volume = 0.3;
  window.speechSynthesis.speak(ssu);
}

export class Reader extends Phaser.Scene {
  [x: string]: any;
  protected repeatKey: Phaser.Input.Keyboard.Key;
  protected upKey: Phaser.Input.Keyboard.Key;
  protected downKey: Phaser.Input.Keyboard.Key;
  protected leftKey: Phaser.Input.Keyboard.Key;
  protected rightKey: Phaser.Input.Keyboard.Key;
  protected clickKey: Phaser.Input.Keyboard.Key;
  protected confirmKey: Phaser.Input.Keyboard.Key;
  protected helpKey: Phaser.Input.Keyboard.Key;

  protected isClicking = false;
  protected swipeDirection: any;
  protected eventTriggered = false;

  protected confirm = false;
  protected tapTimes = 0;
  protected tapDurant = 0;

  protected bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  constructor(name: string) {
    super({
      key: name,
    });
  }
  preload() {
    this.load.bitmapFont(
      "sysFont",
      "./assets/font/snakeFont.png",
      "./assets/font/snakeFont.fnt"
    );
  }

  init(data: any) {
    this.repeatKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.R
    );
    this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.downKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    this.helpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    this.confirmKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    this.leftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );

    this.rightKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );

    this.clickKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  create() {}

  confirmButton() {
    this.swipeDirection = "confirm";
    console.log("confirm");
    this.eventTriggered = true;
    this.isClicking = false;
  }

  tripleClickButton() {
    this.swipeDirection = "tripleClick";
    console.log("tripleClick");
    this.eventTriggered = true;
    this.isClicking = false;
  }

  unConfirm() {
    this.eventTriggered = false;
  }

  isConfirm(): boolean {
    return (
      (this.swipeDirection == "confirm" && this.eventTriggered) ||
      Phaser.Input.Keyboard.JustDown(this.confirmKey)
    );
  }

  repeatButton(): void {
    this.swipeDirection = "repeatButton";
    console.log("repeatButton");
    this.eventTriggered = true;
    this.isClicking = false;
  }

  isOnRepeatButton() {
    return this.eventTriggered && this.swipeDirection == "repeatButton";
  }

  isTripleClick() {
    return this.eventTriggered && this.swipeDirection == "tripleClick";
  }

  update(): void {
    if (this.tapDurant > 0) {
      this.tapDurant++;
      console.log(this.tapDurant);
    }

    if (this.tapDurant > 25) {
      console.log("tapping times: " + this.tapTimes);
      if (this.tapTimes === 1) {
        this.repeatButton();
      } else if (this.tapTimes === 2) {
        this.confirmButton();
      } else if (this.tapTimes === 3) {
        this.tripleClickButton();
      }
      this.tapTimes = 0;
      this.tapDurant = 0;
      console.log("tapping times: " + this.tapTimes);
    }

    if (Phaser.Input.Keyboard.JustDown(this.clickKey)) {
      this.tapDurant++;
      this.tapTimes++;
      console.log("count");
    }

    // touch and click
    const distanceY =
      this.input.activePointer.upY - this.input.activePointer.downY;
    if (
      !this.input.activePointer.isDown &&
      this.isClicking === true &&
      this.eventTriggered === false
    ) {
      console.log(distanceY);

      if (Math.abs(distanceY) < 50) {
        this.tapTimes++;
        this.tapDurant++;
        console.log("count");
      } else {
        if (distanceY < 0) {
          this.swipeDirection = "up";
          console.log("up");
        } else if (distanceY > 0) {
          this.swipeDirection = "down";
          console.log("down");
        }
        this.eventTriggered = true;
      }
      this.isClicking = false;
    } else if (this.input.activePointer.isDown && this.isClicking == false) {
      this.isClicking = true;
    }
  }

  addToBitmapTexts(item: Phaser.GameObjects.BitmapText): void {
    this.bitmapTexts.push(item);
  }
}
