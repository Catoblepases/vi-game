import { CONST } from "../const/const";
import { Player } from "../objects/Player";
import { createTextAuto } from "../utils/createMenu";
import { speak } from "../utils/reader";

export class AdventureScene extends Phaser.Scene {

  private startKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super("AdventureScene");
  }

  init(data: any): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
  }

  preload(): void {
    this.load.bitmapFont(
      "sysFont",
      "./assets/font/snakeFont.png",
      "./assets/font/snakeFont.fnt"
    );
  }

  create(): void {
  }

  update(): void {
  }
}
