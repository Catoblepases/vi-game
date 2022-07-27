import { CONST } from "../const/const";
import { Reader, speak } from "./reader";

export const helpTextPC: string =
  "Press the key to go to the next menu item, " +
  "press the up key to go to the previous menu item, " +
  "press r to repeat the text of the menu item, and press h Double click";

export const helpTextMobile: string =
  "Swipe down to the next menu item, swipe up to the next menu item, " +
  "click on the screen to confirm your selection, " +
  "double click Double click";

export class MenuReader extends Reader {
  [x: string]: any;
  protected isClicking = false;
  protected eventTriggered = false;

  protected confirm = false;
  protected tapTimes = 0;
  protected tapDurant = 0;

  protected choices: string[];
  protected currentChoice: number;
  protected bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  constructor(choices: string[], name: string) {
    super(name);
    this.choices = choices;
  }

  preload() {
    super.preload();
  }

  init(data: any) {
    super.init(data);
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

  update(): void {
    super.update();
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
    } else if (Phaser.Input.Keyboard.JustDown(this.confirmKey)) {
      this.confirmButton();
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
