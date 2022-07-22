import { Player } from "./Player";
import { howler, Howl } from "howler";
import { AllEvents } from "./AllEvents";
import { Position } from "./Position";

export enum EventType {
  CollectFood = 2,
  CollectEther = 1,
  Animal = 4,
  Monster = 3,
  Ruins = 5,
  None = 0,
}

export abstract class REvent {
  event: EventType;

  constructor(param: any) {
    let { event = EventType.None } = param;
    this.event = event;
  }

  static createCollectFood() {
    return new collectFood();
  }

  static createCollectEther() {
    return new collectEther();
  }

  static createDefaultEvent() {
    return new REvent({});
  }

  stopEvent(allEvents: AllEvents, position: Position) {
    allEvents.deleteEvent(position.x, position.y);
  }

  getEventType() {
    return this.event;
  }
}

export class collectEther extends REvent {
  constructor() {
    super({ event: EventType.CollectEther });
  }
}

export class collectFood extends REvent {
  constructor() {
    super({ event: EventType.CollectFood });
  }
}
