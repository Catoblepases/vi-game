import { CONST } from "../const/const";
import { Player } from "../objects/Player";
import { createTextAuto } from "../utils/createMenu";
import { speak } from "../utils/reader";
import { AllEvents } from "../objects/AllEvents";
import { Position } from "../objects/Position";
import { REvent } from "../objects/REvent";

export class AdventureScene extends Phaser.Scene {
  protected upKey: Phaser.Input.Keyboard.Key;
  protected downKey: Phaser.Input.Keyboard.Key;
  protected leftKey: Phaser.Input.Keyboard.Key;
  protected rightKey: Phaser.Input.Keyboard.Key;

  protected allEvents: AllEvents;
  protected player: Player;
  protected position: Position;

  constructor() {
    super({ key: "AdventureScene" });
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

  update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.leftKey)) {
      this.position.moveLeft();
      speak("move left");
      speak("at " + this.position.x + " " + this.position.y);
    } else if (Phaser.Input.Keyboard.JustDown(this.rightKey)) {
      this.position.moveRight();
      speak("move right");
      speak("at " + this.position.x + " " + this.position.y);
    } else if (Phaser.Input.Keyboard.JustDown(this.downKey)) {
      this.position.moveDown();
      speak("move down");
      speak("at " + this.position.x + " " + this.position.y);
    } else if (Phaser.Input.Keyboard.JustDown(this.upKey)) {
      this.position.moveUp();
      speak("move up");
      speak("at " + this.position.x + " " + this.position.y);
    }
  }
  checkEvent(){
    switch(this.allEvents.getEvent(this.position.x,this.position.y)?.event){
      case 1:
        this.player.setEther(this.player.getEther()+1);
      case 2:
        this.player.setFood(this.player.getFood()+1);
      case 3:
        this.player.setEther(0);
        this.player.setFood(0);
      case 4:
        


    }

  }
}
