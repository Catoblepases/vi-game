import { CONST } from "../const/const";
import { randomNumber } from "../utils/random";
import { AllEvents } from "./AllEvents";
import { Player } from "./Player";
import { Position } from "./Position";
import { EventType, REvent } from "./REvent";
import { Sounds } from "./Sounds";

export class Monster extends REvent {
  static cpt: number = 0;
  private id: number;
  playSound() {
    switch (this.id) {
      case 0:
        Sounds.getInstance.playMonsterA(this.position);
        console.log("monsterA:playSound");
        break;
      case 1:
        Sounds.getInstance.playMonsterB(this.position);
        console.log("monsterB:playSound");
        break;
      case 2:
        Sounds.getInstance.playMonsterC(this.position);
        console.log("monsterC:playSound");
        break;
      default:
        break;
    }
  }

  changeSound() {
    console.log("monster:changeSound");
    console.log("playsoundsofmonster");
    console.log(
      "player:" + Player.getInstance.getPosition + "  monster:" + this.position
    );
    switch (this.id) {
      case 0:
        Sounds.getInstance.changeMonsterA(this.position);
        break;
      case 1:
        Sounds.getInstance.changeMonsterB(this.position);
        break;
      case 2:
        Sounds.getInstance.changeMonsterC(this.position);
        break;
      default:
        break;
    }
  }

  do() {
    Player.getInstance.setEther = 0;
    Player.getInstance.setFood = 0;
  }

  private position: Position;

  constructor(position: Position) {
    super({ event: EventType.Monster });
    this.position = position;
    this.id = Monster.cpt++;
  }

  moveToPlayer(allevents: AllEvents) {
    const playerPosition = Player.getInstance.getPosition;
    allevents.deleteEvent(this, this.position);
    const dx = playerPosition.x - this.position.x;
    const dy = playerPosition.y - this.position.y;
    if (dy > 0) {
      this.position.moveUp();
    } else if (dy < 0) {
      this.position.moveDown();
    } else if (dx > 0) {
      this.position.moveRight();
    } else if (dx < 0) {
      this.position.moveLeft();
    }
    allevents.addEvent(this, this.position);
    this.changeSound();
  }
}
