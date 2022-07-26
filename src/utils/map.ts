import { CONST } from "../const/const";
import { Player } from "../objects/Player";
import { speak } from "./menu-reader";
import { AllEvents } from "../objects/AllEvents";
import { Position } from "../objects/Position";
import { Reader } from "./reader";
import { EventType } from "../objects/REvent";
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
          this.allEvents.addEvent(
            new Animal(),
            Position.createRandomPosition()
          );
        }
        break;
      default:
        break;
    }
    evt.do();
    evt.stopEvent(this.allEvents, this.position);
  }

  checkMove() {
    if (this.moves != this.moveTimes) {
      speak(this.position.toString());
      this.allEvents.moveToPlayer();
      this.allEvents.changeSounds();
      this.checkEvent();
      this.moves++;
    }
    var hitOrNot = false;
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
    } else {
      return;
    }
    if (hitOrNot) {
      Sounds.getInstance.playHitSound();
      hitOrNot = false;
    }
  }
}
