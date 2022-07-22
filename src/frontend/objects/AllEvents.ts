import { EventType, REvent } from "./REvent";
import { CONST } from "../const/const";
import { Position } from "./Position";
import { Monster } from "./Monster";
import { Animal } from "./Animal";

export class AllEvents {
  private events: REvent[][];
  private monsters: Monster[];
  private animals: Animal[];

  constructor(param: any) {
    let { events = undefined } = param;
    if (events) {
      this.events = events;
      return;
    }
    this.events = [];
    for (let idx = 0; idx < CONST.MAP_SIZE; idx++) {
      const item: any[] = [];
      for (let i = 0; i < CONST.MAP_SIZE; i++) {
        item.push(REvent.createDefaultEvent());
      }
      this.events.push(item);
    }
  }

  addEvent(event: REvent, position: Position) {
    this.events[position.x][position.y] = event;
    switch (event.getEventType()) {
      case EventType.Monster:
        this.monsters.push(event as Monster);
        break;
      case EventType.Animal:
        this.animals.push(event as Animal);
        break;
      default:
        break;
    }
  }

  deleteEvent(x: number, y: number) {
    AllEvents[x][y] = REvent.createDefaultEvent();
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
