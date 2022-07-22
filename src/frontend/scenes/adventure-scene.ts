import { CONST } from "../const/const";
import { Player } from "../objects/Player";
import { createTextAuto } from "../utils/createMenu";
import { speak } from "../utils/menu-reader";
import { AllEvents } from "../objects/AllEvents";
import { Position } from "../objects/Position";
import { EventType, REvent } from "../objects/REvent";
import { MapWithReader } from "../utils/map";

export class AdventureScene extends MapWithReader {
  constructor() {
    super("AdventureScene");
    this.allEvents = new AllEvents({});
    this.allEvents.addEvent(REvent.createCollectFood(), new Position(7, 8));
    this.allEvents.addEvent(REvent.createCollectEther(), new Position(7, 9));
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

  checkEvent() {
    switch (this.allEvents.getEvent(this.position.x, this.position.y)?.event) {
      case 1:
        this.player.setEther(this.player.getEther() + 1);
        break;
      case 2:
        this.player.setFood(this.player.getFood() + 1);
        break;
      case 3:
        this.player.setEther(0);
        this.player.setFood(0);
        break;
      case 4:
        break;
    }
  }
}
