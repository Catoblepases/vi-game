import { CONST } from "../const/const";
import { Player } from "../objects/Player";
import { createTextAuto } from "../utils/createMenu";
import { Reader } from "../utils/reader";

export class EtherScene extends Reader {
  private startKey: Phaser.Input.Keyboard.Key;
  constructor() {
    super(["build house", "create weapons", "quit"], "EtherScene");
  }

  init(data: any): void {
    super.init(data);
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
  }

  preload(): void {
    this.load.bitmapFont(
      "sysFont",
      "./assets/font/snakeFont.png",
      "./assets/font/snakeFont.fnt"
    );
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
    if (Phaser.Input.Keyboard.JustDown(this.confirmKey)) {
      console.log(this.currentChoice);

      switch (this.currentChoice) {
        case 0:
          this.scene.start("HouseScene", { player: new Player() });
          console.log("start");
          break;
        case 2:
          this.scene.stop;
          break;
        default:
          break;
      }
    }
  }
}
