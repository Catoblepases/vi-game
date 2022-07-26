import { Player } from "./Player";
import { Position } from "./Position";
import { REvent, EventType } from "./REvent";
import { Sounds } from "./Sounds";

export class Animal extends REvent {
  static cpt: number = 0;
  private id: number;
  changeSound(position: Position) {
    console.log("playsoundsofanimal");
    console.log(
      "player:" + Player.getInstance.getPosition + "  animal:" + position
    );
    switch (this.id) {
      case 0:
        Sounds.getInstance.changeAnimal1(position);
        break;
      case 1:
        Sounds.getInstance.changeAnimal2(position);
        break;
      case 2:
        Sounds.getInstance.changeAnimal3(position);
        break;
      default:
        break;
    }
  }
  playSound(position: Position) {
    switch (this.id) {
      case 0:
        Sounds.getInstance.playAnimal1(position);
        break;
      case 1:
        Sounds.getInstance.playAnimal2(position);
        break;
      case 2:
        Sounds.getInstance.playAnimal3(position);
        break;
      default:
        break;
    }
  }
  do() {
    switch (this.id) {
      case 0:
        
        break;
      case 1:
        
        break;
      case 2:
        
        break;
      default:
        break;
    }
  }
  constructor() {
    super({ event: EventType.Animal });
    this.id = Animal.cpt++;
  }
}
