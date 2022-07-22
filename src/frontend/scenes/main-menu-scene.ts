import { CONST } from "../const/const";
import { Player } from "../objects/Player";
import { createTextAuto } from "../utils/createMenu";
import { MenuReader, speak } from "../utils/menu-reader";

export class MainMenuScene extends MenuReader {
  private startKey: Phaser.Input.Keyboard.Key;
  constructor() {
    super(["new Game", "continue", "quit"], "MainMenuScene");
  }

  init(data: any): void {
    super.init(data);
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
  }

  preload(): void {
    super.preload();
  }

  create(): void {
    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 70,
        this.sys.canvas.height / 2 - 60,
        "sysFont",
        "RANDOMLAND",
        16
      )
    );
    createTextAuto(this);
  }

  update(): void {
    super.update();
    if (this.isConfirm()) {
      console.log("confirm");
      switch (this.currentChoice) {
        case 0:
          this.scene.start("HouseScene", {
            player: new Player(),
          });
          console.log("start");
          break;
        case 1:
          this.scene.start("HouseScene", {
            player: new Player(),
          });
          console.log("start");
          break;
        case 2:
          this.scene.stop;
          break;
        default:
          break;
      }
      this.unConfirm();
    }
  }
}
