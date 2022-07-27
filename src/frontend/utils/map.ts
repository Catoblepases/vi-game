import { CONST } from "../const/const";
import { Player } from "../objects/Player";
import { speak } from "../utils/reader";

import { AllEvents } from "../objects/AllEvents";
import { Position } from "../objects/Position";
import { Reader } from "./reader";
import { EventType, MapEvent } from "../objects/MapEvent";
import { Animal } from "../objects/Animal";
import { Sounds } from "../objects/Sounds";

export class MapWithReader extends Reader {
  protected allEvents: AllEvents;
  protected player: Player;
  protected position: Position;
  protected moveTimes: number;
  protected moves: number;

  constructor(name: string) {
    super(name);
  }

  init(data: any): void {
    super.init(data);
    this.allEvents.playSounds();
    this.player = data.player;
    this.position = data.player.getPosition;
    this.moveTimes = 0;
    this.moves = 0;
  }

  preload(): void {
    super.preload();
  }

  create(): void {}

  volumeCalculator(p1: Position, p2: Position) {}

  update(): void {
    super.update();
    this.checkMove();
  }

  checkEvent() {
    const events = this.allEvents.getEvents(this.position);
    if (!events || events.length === 0) {
      return;
    }
    const evt = events[0];
    speak(evt.toString());
    switch (evt.getEventType()) {
      case EventType.Animal:
        if ((evt as Animal).getId != 2) {
          const pos = Position.createRandomPosition();
          const ani = new Animal(pos);
          this.allEvents.addEvent(ani, ani.getPosition());
          ani.playSound(ani.getPosition());
          console.log("createAnimal:" + ani.getPosition());
        }
        break;
      default:
        break;
    }
    evt.do();
    this.allEvents.deleteEvent(evt, this.position);
  }

  checkMove() {
    if (this.moves != this.moveTimes) {
      this.allEvents.playSounds();
      speak(this.position.toString());
      this.allEvents.moveToPlayer();
      this.checkEvent();
      console.log("moves: " + this.moves);
      this.moves++;
    }
    var hitOrNot = true;
    if (Phaser.Input.Keyboard.JustDown(this.leftKey)) {
      hitOrNot = this.position.moveLeft();
      speak("move left");
      this.moveTimes++;
    } else if (Phaser.Input.Keyboard.JustDown(this.rightKey)) {
      hitOrNot = this.position.moveRight();
      speak("move right");
      this.moveTimes++;
    } else if (Phaser.Input.Keyboard.JustDown(this.downKey)) {
      hitOrNot = this.position.moveDown();
      this.moveTimes++;
      speak("move down");
    } else if (Phaser.Input.Keyboard.JustDown(this.upKey)) {
      hitOrNot = this.position.moveUp();
      this.moveTimes++;
      speak("move up");
    } else if (Phaser.Input.Keyboard.JustDown(this.clickKey)) {
      Sounds.getInstance.playOnGetFood();
    } else {
      return;
    }
  }
}
