import { CONST } from "../const/const";
import { Reader } from "../utils/reader";

export class MainMenuScene extends Reader {
  private startKey: Phaser.Input.Keyboard.Key;
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];
  constructor() {
    super(["new Game", "continue", "quit"], "MainMenuScene");
  }

  init(): void {
    super.init();
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

    var initHPos = this.sys.canvas.height / 2 - 10;
    var distanceChoice =
      (this.sys.canvas.height - initHPos - 10) / this.choices.length;

    for (let i = 0; i < this.choices.length; i++) {
      this.bitmapTexts.push(
        this.add.bitmapText(
          this.sys.canvas.width / 2 - 30,
          initHPos + distanceChoice * i,
          "sysFont",
          this.choices[i],
          8
        )
      );
    }
  }

  update(): void {
    super.update();
    if (Phaser.Input.Keyboard.JustDown(this.confirmKey)) {
      switch (this.currentChoice) {
        case 0:
          this.scene.start("GameScene");
          break;
        default:
          break;
      }
    }
  }
}
