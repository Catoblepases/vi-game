import { CONST } from "../const/const";
import { randomNumber } from "../utils/random";
import { AllEvents } from "./AllEvents";
import { Position } from "./Position";
import { EventType, REvent } from "./REvent";

export class Monster extends REvent {
  private position: Position;

  constructor() {
    super({ event: EventType.Monster });
    this.position = new Position(
      randomNumber(0, CONST.MAP_SIZE - 1),
      randomNumber(0, CONST.MAP_SIZE - 1)
    );
  }

  moveToPlayer(playerPosition: Position, allevents: AllEvents) {
    allevents.deleteEvent(this.position.x, this.position.y);
    const dx = playerPosition.x - this.position.x;
    const dy = playerPosition.y - this.position.y;
    if (dx > 0) {
      this.position.moveUp();
    } else if (dx < 0) {
      this.position.moveDown();
    }
    if (dy > 0) {
      this.position.moveRight();
    } else if (dy < 0) {
      this.position.moveLeft();
    }
    allevents.addEvent(this, this.position);
  }
}
