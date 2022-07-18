import { CONST } from "../const/const";

export function speak(msg: string) {
  let ssu = new window.SpeechSynthesisUtterance();
  ssu.voice = window.speechSynthesis.getVoices()[1];
  ssu.lang = "en-US";
  ssu.rate = 1.2;
  ssu.text = msg;
  window.speechSynthesis.speak(ssu);
}

export const helpTextPC: string =
  "Press the key to go to the next menu item, " +
  "press the up key to go to the previous menu item, " +
  "press r to repeat the text of the menu item, and press h Double click";

export const helpTextMobile: string =
  "Swipe down to the next menu item, swipe up to the next menu item, " +
  "click on the screen to confirm your selection, " +
  "double click Double click";

export class Reader extends Phaser.Scene {
  [x: string]: any;
  protected repeatKey: Phaser.Input.Keyboard.Key;
  protected upKey: Phaser.Input.Keyboard.Key;
  protected downKey: Phaser.Input.Keyboard.Key;
  protected confirmKey: Phaser.Input.Keyboard.Key;
  protected helpKey: Phaser.Input.Keyboard.Key;

  protected isClicking = false;
  protected swipeDirection;
  protected eventTriggered = false;

  protected confirm = false;
  protected tapTimes = 0;
  protected tapDurant = 0;

  protected choices: string[];
  protected currentChoice: number;
  protected bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  constructor(choices: string[], name: string) {
    super({
      key: name,
    });
    this.choices = choices;
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
    this.currentChoice = 0;
  }

  create() {
    var tap = this.rexGestures.add.tap({
      enable: true,
      bounds: undefined,

      time: 250,
      tapInterval: 200,
      threshold: 9,
      tapOffset: 10,

      taps: undefined,
      minTaps: undefined,
      maxTaps: undefined,
    });

    this.rexGestures.add.tap({ taps: 3 }).on("tap", function (tap) {
      speak(helpTextMobile);
      console.log("tap 3 times");
    });
  }

  changeNumber(amount: number) {
    if (
      this.currentChoice + amount < this.choices.length &&
      this.currentChoice + amount >= 0
    ) {
      this.currentChoice = this.currentChoice + amount;
    } else if (this.currentChoice + amount >= this.choices.length) {
      this.currentChoice = this.currentChoice + amount - this.choices.length;
    } else if (this.currentChoice + amount < 0) {
      this.currentChoice = this.currentChoice + amount + this.choices.length;
    }
  }

  confirmButton() {
    this.swipeDirection = "confirm";
    console.log("confirm");
    this.eventTriggered = true;
    this.isClicking = false;
  }

  unConfirm() {
    this.eventTriggered = false;
  }

  isConfirm(): boolean {
    console.log(
      "isConfirm: " +
        (this.swipeDirection == "confirm" && this.eventTriggered) ||
        Phaser.Input.Keyboard.JustDown(this.confirmKey)
    );

    return (
      (this.swipeDirection == "confirm" && this.eventTriggered) ||
      Phaser.Input.Keyboard.JustDown(this.confirmKey)
    );
  }

  update(): void {
    if (this.tapDurant > 0) {
      this.tapDurant++;
      console.log(this.tapDurant);
    }
    if (this.tapDurant > 20) {
      if (this.tapTimes == 1) {
        this.confirmButton();
      } else if (this.tapTimes >= 2) {
        speak(helpTextMobile);
        console.log("help");
      }
      this.tapTimes = 0;
      this.tapDurant = 0;
    }

    // touch and click
    const distanceY =
      this.input.activePointer.upY - this.input.activePointer.downY;
      
    if (
      !this.input.activePointer.isDown &&
      this.isClicking == true &&
      this.eventTriggered == false
    ) {
      console.log(distanceY);

      if (Math.abs(distanceY) < 30) {
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

    // keyboard
    if (
      Phaser.Input.Keyboard.JustDown(this.upKey) ||
      (this.eventTriggered && this.swipeDirection == "up")
    ) {
      this.changeNumber(-1);
      speak(this.choices[this.currentChoice]);
      this.eventTriggered = false;
    } else if (
      Phaser.Input.Keyboard.JustDown(this.downKey) ||
      (this.eventTriggered && this.swipeDirection == "down")
    ) {
      this.changeNumber(1);
      speak(this.choices[this.currentChoice]);
      this.eventTriggered = false;
    } else if (Phaser.Input.Keyboard.JustDown(this.repeatKey)) {
      speak(this.choices[this.currentChoice]);
    } else if (Phaser.Input.Keyboard.JustDown(this.helpKey)) {
      speak(helpTextPC);
    }
  }

  getChoices(): string[] {
    return this.choices;
  }

  addToBitmapTexts(item: Phaser.GameObjects.BitmapText): void {
    this.bitmapTexts.push(item);
  }

  addToChoices(item: string): void {
    this.choices.push(item);
  }
}
