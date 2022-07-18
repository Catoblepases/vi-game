import { CONST } from "../const/const";
import { Player } from "../objects/Player";
import { createTextAuto } from "../utils/createMenu";
import { Reader, speak } from "../utils/reader";

export class HouseScene extends Reader {
  private callDataMenu: Phaser.Input.Keyboard.Key;
  // field and game setting
  private gameHeight: number;
  private gameWidth: number;
  private boardWidth: number;
  private boardHeight: number;
  
  // objects
  private player: Player;
  private gameBorder: Phaser.GameObjects.Graphics[];

  // texts
  private scoreText: Phaser.GameObjects.BitmapText;

  constructor() {
    super(
      [
        "collect ether",
        "collect food",
        "use ether machine",
        "exploration",
        "collection policy",
      ],
      "HouseScene"
    );
  }

  init(data: any): void {
    super.init(data);
    this.player = data.player;
    this.gameHeight = this.sys.canvas.height;
    this.gameWidth = this.sys.canvas.width;
    this.boardWidth = this.gameWidth - 2 * CONST.FIELD_SIZE;
    this.boardHeight = this.gameHeight - 2 * CONST.FIELD_SIZE;
    this.horizontalFields = this.boardWidth / CONST.FIELD_SIZE;
    this.verticalFields = this.boardHeight / CONST.FIELD_SIZE;
    this.tick = 0;
    this.callDataMenu = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );
  }

  create(): void {
    // objects
    this.scoreText = this.add.bitmapText(
      this.gameWidth / 5,
      1,
      "sysFont",
      this.player.toInfoSimple(),
      8
    );

    this.gameBorder = [];
    createTextAuto(this);
  }

  update(): void {
    super.update();

    if (Phaser.Input.Keyboard.JustDown(this.callDataMenu)) {
      speak(this.player.toString());
    }

    this.scoreText.setText(this.player.toInfoSimple());

    if (this.isConfirm()) {
      switch (this.currentChoice) {
        case 0:
          this.player.collectEther();
          break;
        case 1:
          this.player.collectFood();
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          this.scene.stop();
          this.scene.start("PolicyScene", { player: this.player });
          break;
        default:
          break;
      }
      
      this.unConfirm();
    }
  }
}
