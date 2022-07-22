import { CONST } from "../const/const";
import { Player } from "../objects/Player";
import { createTextAuto } from "./createMenu";
import { speak } from "./menu-reader";
import { AllEvents } from "../objects/AllEvents";
import { Position } from "../objects/Position";
import { Reader } from "./reader";

export class MapWithReader extends Reader {

  protected allEvents: AllEvents;
  protected player: Player;
  protected position: Position;

  constructor(name: string) {
    super(name);
  }

  init(data: any): void {
    this.player = data.player;
    this.position = data.player.getPosition();
  }

  preload(): void {
    this.load.bitmapFont(
      "sysFont",
      "./assets/font/snakeFont.png",
      "./assets/font/snakeFont.fnt"
    );
  }

  create(): void {}

  volumeCalculator(p1: Position, p2: Position) {}

  tripleClick(){

  }

  update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.leftKey)) {
      this.position.moveLeft();
      speak("move left");
    } else if (Phaser.Input.Keyboard.JustDown(this.rightKey)) {
      this.position.moveRight();
      speak("move right");
    } else if (Phaser.Input.Keyboard.JustDown(this.downKey)) {
      this.position.moveDown();
      speak("move down");
    } else if (Phaser.Input.Keyboard.JustDown(this.upKey)) {
      this.position.moveUp();
      speak("move up");
    }
  }
}
