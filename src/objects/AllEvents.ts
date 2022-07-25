import { EventType, REvent } from "./REvent";
import { CONST } from "../const/const";
import { Position } from "./Position";
import { Monster } from "./Monster";
import { Animal } from "./Animal";

export class AllEvents {
  private events: Map<string, REvent[]>;
  private monsters: Monster[];
  private animals: Animal[];

  constructor(param: any) {
    let { events = undefined } = param;
    if (events) {
      this.events = events;
      return;
    }
    this.events = new Map();
    this.animals = [];
    this.monsters = [];
  }

  addEvent(event: REvent, position: Position) {
    const key = position.toString();
    if (this.events.has(key)) {
      this.events.get(key)?.push(event);
    } else {
      this.events.set(key, [event]);
    }
    // Sort by Event Priority
    this.events.get(key)?.sort((a, b) => {
      return b.getEventType() - a.getEventType();
    });
    switch (event.getEventType()) {
      case EventType.Monster:
        if (!this.monsters.includes(event as Monster)) {
          this.monsters.push(event as Monster);
        }
        break;
      case EventType.Animal:
        this.animals.push(event as Animal);
        break;
      default:
        break;
    }
  }

  deleteEvent(event: REvent, position: Position) {
    this.events.get(position.toString()).shift();
  }

  getEvents(position: Position) {
    if (
      position.x <= CONST.MAP_SIZE - 1 &&
      position.x >= 0 &&
      position.y <= CONST.MAP_SIZE - 1 &&
      position.y >= 0
    ) {
      return this.events.get(position.toString());
    }
  }

  playSounds() {
    console.log("try to play sounds.");
    this.events.forEach((value, pos) => {
      value.forEach((val, index) => {
        val.playSound(Position.ofString(pos));
      });
    });
  }

  changeSounds() {
    console.log("try to change sounds.");
    this.events.forEach((value, pos) => {
      value.forEach((val, index) => {
        val.changeSound(Position.ofString(pos));
      });
    });
  }

  moveToPlayer() {
    this.monsters.forEach((monster, index) => {
      monster.moveToPlayer(this);
    });
  }
}
