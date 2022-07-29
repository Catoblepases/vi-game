import { CONST } from "../const/const";
import { Player } from "../objects/Player";
import { Sounds } from "../objects/Sounds";
import { createTextAuto } from "../utils/createMenu";
import { MenuReader } from "../utils/menu-reader";
import { speak } from "../utils/reader";

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
    speak("Press Enter To Start The Game");
  }

  preload(): void {
    super.preload();
    Sounds.getInstance;
  }

  create(): void {
    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 70,
        this.sys.canvas.height / 2 - 60,
        "sysFont",
        "HazeOfHodur",
        16
      )
    );
    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 70,
        this.sys.canvas.height / 2 - 90,
        "sysFont",
        "Press Enter To Start The Game",
        10
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
          this.scene.start("OpenScene", {
            player: Player.getInstance,
            process: -1,
          });
          console.log("start");
          break;
        case 1:
          this.scene.start("HouseScene", {
            player: Player.getInstance,
          });
          console.log("house");
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
