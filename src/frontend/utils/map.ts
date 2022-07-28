import { CONST } from "../const/const";
import { Player } from "../objects/Player";
import { addToSpeakList, speak } from "../utils/reader";

import { AllEvents } from "../objects/AllEvents";
import { Position } from "../objects/Position";
import { Reader } from "./reader";
import { EventType, MapEvent } from "../objects/MapEvent";
import { Animal } from "../objects/Animal";
import { Sounds } from "../objects/Sounds";
import {
  animalOrMonsterProgress,
  ProgressStory,
} from "../objects/animalOrMonsterProgress";

export class MapWithReader extends Reader {
  protected allEvents: AllEvents;
  protected player: Player;
  protected position: Position;
  protected moveTimes: number;
  protected moves: number;

  constructor(name: string) {
    super(name);
    animalOrMonsterProgress.getInstance;
  }

  init(data: any): void {
    super.init(data);
    this.allEvents.playSounds();
    this.player = data.player;
    this.position = data.player.getPosition;
    this.moveTimes = 0;
    this.moves = 0;
    Sounds.getInstance.progress = 15;
  }

  preload(): void {
    super.preload();
  }
  private initScene: boolean = true;
  initScenePlay() {
    Sounds.getInstance.animal11dialog.play();
  }

  create(): void {}

  volumeCalculator(p1: Position, p2: Position) {}

  private numClick: number = 0;

  update(): void {
    if (this.initScene) {
      this.initScenePlay();
      this.initScene = false;
    }
    super.update();

    switch (animalOrMonsterProgress.getInstance.progress) {
      case ProgressStory.animal1:
        if (Sounds.getInstance.progress == 17) {
          animalOrMonsterProgress.getInstance.changeToAnimal2appear();
        } else {
          Sounds.getInstance.playDialog();
        }
        break;
      case ProgressStory.animal2appear:
        if (Sounds.getInstance.progress == 18) {
          animalOrMonsterProgress.getInstance.changeToNone();
        } else {
          Sounds.getInstance.playDialog();
        }
        break;
      case ProgressStory.animal2:
        if (Sounds.getInstance.progress == 19) {
          animalOrMonsterProgress.getInstance.changeToNone();
        } else {
          Sounds.getInstance.playDialog();
        }
        break;
      case ProgressStory.animal3:
        if (Sounds.getInstance.progress == 20) {
          animalOrMonsterProgress.getInstance.changeToBoss();
        } else {
          Sounds.getInstance.playDialog();
        }
        break;
      case ProgressStory.BossFight:
        if (Sounds.getInstance.progress == 21) {
          Sounds.getInstance.changeToBoss();
          animalOrMonsterProgress.getInstance.changeToBossF();
        } else {
          Sounds.getInstance.playDialog();
        }
        break;
      case -8:
        if (this.numClick > 20) {
          animalOrMonsterProgress.getInstance.changeAfterBoss();
        } else if (Phaser.Input.Keyboard.JustDown(this.clickKey)) {
          Sounds.getInstance.playOnGetFood();
          this.numClick++;
          this.unConfirm();
        }
        break;
      case ProgressStory.AfterBossFight:
        if (Sounds.getInstance.progress == 21) {
          Sounds.getInstance.changeToForest();
          animalOrMonsterProgress.getInstance.changeToNone();
        } else {
          Sounds.getInstance.playDialog();
        }
        break;
      case ProgressStory.monster:
        break;
      default:
        if (this.isOnRepeatButton()) {
          Sounds.getInstance.repeatDialog();
          this.unConfirm();
        }
        this.checkMove();
        break;
    }
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
      addToSpeakList("move left");
      this.moveTimes++;
    } else if (Phaser.Input.Keyboard.JustDown(this.rightKey)) {
      hitOrNot = this.position.moveRight();
      addToSpeakList("move right");
      this.moveTimes++;
    } else if (Phaser.Input.Keyboard.JustDown(this.downKey)) {
      hitOrNot = this.position.moveDown();
      this.moveTimes++;
      addToSpeakList("move down");
    } else if (Phaser.Input.Keyboard.JustDown(this.upKey)) {
      hitOrNot = this.position.moveUp();
      this.moveTimes++;
      addToSpeakList("move up");
    } else if (Phaser.Input.Keyboard.JustDown(this.clickKey)) {
      Sounds.getInstance.playOnGetFood();
    } else {
      return;
    }

    if (!hitOrNot) {
      Sounds.getInstance.playHitSound();
    }
  }
}
