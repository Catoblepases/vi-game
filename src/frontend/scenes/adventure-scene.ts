import { CONST } from "../const/const";
import { Player } from "../objects/Player";
import { createTextAuto } from "../utils/createMenu";
import { speak } from "../utils/reader";
import { AllEvents } from "../objects/AllEvents";
import { Position } from "../objects/Position";
import { MapWithReader } from "../utils/map";

export class AdventureScene extends MapWithReader {
  constructor() {
    super("AdventureScene");
  }

  init(data: any): void {
    super.init(data);
  }

  preload(): void {
    this.load.bitmapFont(
      "sysFont",
      "./assets/font/snakeFont.png",
      "./assets/font/snakeFont.fnt"
    );
  }

  create(): void {}

  update(): void {
  }
}
