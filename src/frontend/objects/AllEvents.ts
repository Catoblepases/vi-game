import { REvent } from "./REvent";
import { CONST } from "../const/const";

export class AllEvents {
  private events: REvent[][];

  constructor() {
    this.events = [];
    for (let idx = 0; idx < CONST.MAP_SIZE; idx++) {
      const item: any[] = [];
      for (let i = 0; i < CONST.MAP_SIZE; i++) {
        item.push(new REvent({}));
      }
      this.events.push(item);
    }
    this.events[1][1]
  }

  getEvent(x: number, y: number) {
    if (
      x <= CONST.MAP_SIZE - 1 &&
      x >= 0 &&
      y <= CONST.MAP_SIZE - 1 &&
      y >= 0
    ) {
      return this.events[x][y];
    }
  }

}
