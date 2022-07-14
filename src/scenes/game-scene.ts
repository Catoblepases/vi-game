import { CONST } from "../const/const";
import { Player } from "../objects/Player";
import { Reader } from "../utils/reader";

export class GameScene extends Reader {
  // field and game setting

  private gameHeight: number;
  private gameWidth: number;
  private boardWidth: number;
  private boardHeight: number;
  private horizontalFields: number;
  private verticalFields: number;
  private tick: number;

  // objects
  private player: Player;
  private gameBorder: Phaser.GameObjects.Graphics[];

  // texts
  private scoreText: Phaser.GameObjects.BitmapText;

  constructor() {
    super([], "GameScene");
  }

  init(): void {
    super.init();
    this.gameHeight = this.sys.canvas.height;
    this.gameWidth = this.sys.canvas.width;
    this.boardWidth = this.gameWidth - 2 * CONST.FIELD_SIZE;
    this.boardHeight = this.gameHeight - 2 * CONST.FIELD_SIZE;
    this.horizontalFields = this.boardWidth / CONST.FIELD_SIZE;
    this.verticalFields = this.boardHeight / CONST.FIELD_SIZE;
    this.tick = 0;
  }

  create(): void {
    // objects
    this.gameBorder = [];
  }

  update(): void {
    super.update();
  }
}
