import { CONST } from "../const/const";
import { Player } from "./Player";
import { Position } from "./Position";
import { MapEvent, EventType } from "./MapEvent";
import { delay, Sounds } from "./Sounds";
import { animalOrMonsterProgress } from "./animalOrMonsterProgress";

export class Animal extends MapEvent {
  static cpt: number = 0;
  private id: number;
  private position: Position;
  async changeSound(position: Position) {
    console.log("playsoundsofanimal");
    if (!position) {
      return;
    }
    const pos = Sounds.calculSoundsPosition(
      Player.getInstance.getPosition,
      this.position
    );
    console.log(
      "player:" +
        Player.getInstance.getPosition +
        " animal:" +
        this.getPosition() +
        " rePos: " +
        pos
    );
    switch (this.id) {
      case 0:
        Sounds.getInstance.changeAnimal1(this.getPosition());
        break;
      case 1:
        Sounds.getInstance.changeAnimal2(this.getPosition());
        break;
      case 2:
        Sounds.getInstance.changeAnimal3(this.getPosition());
        await delay(Sounds.getInstance.animal3dialog.duration() * 1000);
        break;
      default:
        break;
    }
  }
  playSound(position: Position) {
    console.log("playsoundsofanimal");
    const pos = Sounds.calculSoundsPosition(
      Player.getInstance.getPosition,
      this.position
    );
    console.log(
      "player:" +
        Player.getInstance.getPosition +
        " animal:" +
        this.getPosition() +
        " rePos: " +
        pos
    );
    switch (this.id) {
      case 0:
        Sounds.getInstance.playAnimal1(this.getPosition());
        break;
      case 1:
        Sounds.getInstance.playAnimal2(this.getPosition());
        break;
      case 2:
        Sounds.getInstance.playAnimal3(this.getPosition());
        break;
      default:
        break;
    }
  }

  stopSound() {
    switch (this.id) {
      case 0:
        Sounds.getInstance.animal1.stop();
        break;
      case 1:
        Sounds.getInstance.animal2.stop();
        break;
      case 2:
        Sounds.getInstance.animal3.stop();
        break;
      default:
        break;
    }
  }

  get getId() {
    return this.id;
  }

  async do() {
    this.playSound(Player.getInstance.getPosition);
    await delay(1000);
    this.stopSound();
    switch (this.id) {
      case 0:
        animalOrMonsterProgress.getInstance.changeToAnimal1();
        break;
      case 1:
        animalOrMonsterProgress.getInstance.changeToAnimal2();
        break;
      case 2:
        animalOrMonsterProgress.getInstance.changeToAnimal3();
        break;
      default:
        break;
    }
  }

  constructor(position: Position) {
    super({ event: EventType.Animal });
    this.id = Animal.cpt++;
    this.position = position;

    console.log("create " + this.id + " positon: " + this.position);
  }

  getPosition() {
    return this.position;
  }
}
