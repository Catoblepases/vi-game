import { CONST } from "../const/const";
import { Player } from "../objects/Player";
import { createTextAuto } from "./createMenu";
import { speak } from "./reader";
import { AllEvents } from "../objects/AllEvents";
import { Position } from "../objects/Position";

export class MapWithReader extends Phaser.Scene {
  protected upKey: Phaser.Input.Keyboard.Key;
  protected downKey: Phaser.Input.Keyboard.Key;
  protected leftKey: Phaser.Input.Keyboard.Key;
  protected rightKey: Phaser.Input.Keyboard.Key;

  protected allEvents: AllEvents;
  protected player: Player;
  protected position: Position;

  constructor(name: string) {
    super({ key: name });
  }

  init(data: any): void {
    this.player = data.player;
    this.position = data.player.getPosition();

    this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.downKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    this.leftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this.rightKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
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
