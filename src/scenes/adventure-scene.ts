import { CONST } from "../const/const";
import { Player } from "../objects/Player";
import { createTextAuto } from "../utils/createMenu";
import { speak } from "../utils/menu-reader";
import { AllEvents } from "../objects/AllEvents";
import { Position } from "../objects/Position";
import { EventType, REvent } from "../objects/REvent";
import { MapWithReader } from "../utils/map";
import { Monster } from "../objects/Monster";

export class AdventureScene extends MapWithReader {
  constructor() {
    super("AdventureScene");
    this.allEvents = new AllEvents({});
    this.allEvents.addEvent(REvent.createCollectFood(), new Position(7, 8));
    this.allEvents.addEvent(REvent.createCollectEther(), new Position(7, 9));
    this.allEvents.addEvent(
      new Monster(new Position(10, 10)),
      new Position(10, 10)
    );
    this.allEvents.playSounds();
  }

  init(data: any): void {
    super.init(data);
  }

  preload(): void {
    super.preload();
  }

  create(): void {}

  update(): void {
    super.update();
    this.checkEvent();
  }
}
