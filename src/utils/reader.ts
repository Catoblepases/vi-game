import { CONST } from "../const/const";

export function speak(msg: string) {
  let ssu = new window.SpeechSynthesisUtterance();
  ssu.voice = window.speechSynthesis.getVoices()[1];
  ssu.lang = "en-US";
  ssu.rate = 1.5;
  ssu.text = msg;
  window.speechSynthesis.speak(ssu);
}

export class Reader extends Phaser.Scene {
  protected repeatKey: Phaser.Input.Keyboard.Key;
  protected upKey: Phaser.Input.Keyboard.Key;
  protected downKey: Phaser.Input.Keyboard.Key;
  protected confirmKey: Phaser.Input.Keyboard.Key;
  protected helpKey: Phaser.Input.Keyboard.Key;
  protected choices: string[];
  protected currentChoice: number;
  protected bitmapTexts: Phaser.GameObjects.BitmapText[] = [];
  protected helpText: string =
    "Press the key to go to the next menu item, " +
    "press the up key to go to the previous menu item, " +
    "press r to repeat the text of the menu item, and press h to repeat this instruction document.";

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
    if (Phaser.Input.Keyboard.JustDown(this.upKey)) {
      this.changeNumber(-1);
      speak(this.choices[this.currentChoice]);
    } else if (Phaser.Input.Keyboard.JustDown(this.downKey)) {
      this.changeNumber(1);
      speak(this.choices[this.currentChoice]);
    } else if (Phaser.Input.Keyboard.JustDown(this.repeatKey)) {
      speak(this.choices[this.currentChoice]);
    } else if (Phaser.Input.Keyboard.JustDown(this.helpKey)) {
      speak(this.helpText);
    }
  }

  getChoices(): string[] {
    return this.choices;
  }

  addToBitmapTexts(item: Phaser.GameObjects.BitmapText): void {
    this.bitmapTexts.push(item);
  }
}
