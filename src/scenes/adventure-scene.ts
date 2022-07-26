import { CONST } from "../const/const";
import { Player } from "../objects/Player";
import { createTextAuto } from "../utils/createMenu";
import { speak } from "../utils/menu-reader";
import { AllEvents } from "../objects/AllEvents";
import { Position } from "../objects/Position";
import { EventType, REvent } from "../objects/REvent";
import { MapWithReader } from "../utils/map";
import { Monster } from "../objects/Monster";
import { Animal } from "../objects/Animal";

export class AdventureScene extends MapWithReader {
  private initScene: boolean = false;
  constructor() {
    super("AdventureScene");
    this.allEvents = new AllEvents({});
    // this.allEvents.addEvent(REvent.createCollectFood(), new Position(0, 1));
    // this.allEvents.addEvent(REvent.createCollectFood(), new Position(0, 10));
    // this.allEvents.addEvent(REvent.createCollectFood(), new Position(1, 0));
    // this.allEvents.addEvent(REvent.createCollectFood(), new Position(1, 4));
    // this.allEvents.addEvent(REvent.createCollectFood(), new Position(3, 13));
    // this.allEvents.addEvent(REvent.createCollectFood(), new Position(4, 8));
    // this.allEvents.addEvent(REvent.createCollectFood(), new Position(6, 0));
    // this.allEvents.addEvent(REvent.createCollectFood(), new Position(7, 4));
    // this.allEvents.addEvent(REvent.createCollectFood(), new Position(9, 9));
    // this.allEvents.addEvent(REvent.createCollectFood(), new Position(9, 14));
    // this.allEvents.addEvent(REvent.createCollectFood(), new Position(11, 0));
    // this.allEvents.addEvent(REvent.createCollectFood(), new Position(11, 8));
    // this.allEvents.addEvent(REvent.createCollectFood(), new Position(12, 3));
    // this.allEvents.addEvent(REvent.createCollectFood(), new Position(14, 12));
    // this.allEvents.addEvent(REvent.createCollectFood(), new Position(15, 6));

    // this.allEvents.addEvent(REvent.createCollectEther(), new Position(0, 2));
    // this.allEvents.addEvent(REvent.createCollectEther(), new Position(1, 1));
    // this.allEvents.addEvent(REvent.createCollectEther(), new Position(1, 6));
    // this.allEvents.addEvent(REvent.createCollectEther(), new Position(1, 12));
    // this.allEvents.addEvent(REvent.createCollectEther(), new Position(2, 0));
    // this.allEvents.addEvent(REvent.createCollectEther(), new Position(4, 10));
    // this.allEvents.addEvent(REvent.createCollectEther(), new Position(5, 5));
    // this.allEvents.addEvent(REvent.createCollectEther(), new Position(7, 13));
    // this.allEvents.addEvent(REvent.createCollectEther(), new Position(8, 0));
    // this.allEvents.addEvent(REvent.createCollectEther(), new Position(8, 5));
    // this.allEvents.addEvent(REvent.createCollectEther(), new Position(10, 11));
    // this.allEvents.addEvent(REvent.createCollectEther(), new Position(13, 1));
    // this.allEvents.addEvent(REvent.createCollectEther(), new Position(13, 5));
    // this.allEvents.addEvent(REvent.createCollectEther(), new Position(14, 10));

    this.allEvents.addEvent(
      new Monster(new Position(13, 8)),
      new Position(13, 8)
    );

    this.allEvents.addEvent(
      new Animal(new Position(3, 3)),
      new Position(3, 3)
    );

    this.allEvents.playSounds();
  }

  init(data: any): void {
    super.init(data);
    if (data.init) {
      this.initScene = data.init;
    }
  }

  preload(): void {
    super.preload();
  }

  create(): void {}

  update(): void {
    super.update();
    this.checkEvent();
  }


  initScenePlay(){

  }
}
