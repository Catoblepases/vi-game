import { Player } from "./Player";
import { howler, Howl } from "howler";
import { AllEvents } from "./AllEvents";
import { Position } from "./Position";
import { delay, Sounds } from "./Sounds";

export enum EventType {
  CollectFood = 2,
  CollectEther = 1,
  Animal = 3,
  Monster = 4,
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
    return new NoneEvent();
  }

  abstract playSound(position: Position);
  abstract changeSound(position: Position);

  abstract do();

  stopEvent(allEvents: AllEvents, position: Position) {
    allEvents.deleteEvent(this, position);
  }

  getEventType() {
    return this.event;
  }

  toString() {
    return EventType[this.event];
  }
}

export class NoneEvent extends REvent {
  changeSound(position: Position) {}
  constructor() {
    super({ event: EventType.None });
  }
  playSound(position: Position) {}
  do() {}
}

export class collectEther extends REvent {
  constructor() {
    super({ event: EventType.CollectEther });
  }
  changeSound(position: Position) {}
  playSound(position: Position) {}
  async do() {
    await Sounds.getInstance.playOnGetEtherResources();
    Player.getInstance.collectEther();
  }
}

export class collectFood extends REvent {
  constructor() {
    super({ event: EventType.CollectFood });
  }
  changeSound(position: Position) {}
  playSound(position: Position) {}
  async do() {
    await Sounds.getInstance.playOnGetFood();
    Player.getInstance.collectFood();
  }
}
