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
  }

  create(): void {}

  update(): void {
    super.update();
  }
}
