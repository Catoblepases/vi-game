import { Player } from "./Player";
import { Position } from "./Position";
import { REvent, EventType } from "./REvent";
import { Sounds } from "./Sounds";

export class Animal extends REvent {
  static cpt: number = 0;
  private id: number;
  playSound(position: Position) {
    switch (this.id) {
      case 0:
        Sounds.getInstance.playAnimal1(position);
        break;
      case 1:
        Sounds.getInstance.playAnimal1(position);
        break;
      case 2:
        Sounds.getInstance.playAnimal1(position);
        break;
      default:
        break;
    }
  }
  do() {}
  constructor() {
    super({ event: EventType.Animal });
    this.id = Animal.cpt++;
  }
}
