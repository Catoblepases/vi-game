import { MapWithReader } from "../utils/map";
import { Howler, Howl } from "howler";
import { collectEther, collectFood, MapEvent } from "../objects/MapEvent";
import { AllEvents } from "../objects/AllEvents";
import { delay, Sounds } from "../objects/Sounds";
import { Reader } from "../utils/reader";
import { Player } from "../objects/Player";

export class OpenScene extends Reader {
  private process = -1;

  constructor() {
    super("OpenScene");
  }

  proload() {
    Player.getInstance;
  }

  init(data: any): void {
    super.init(data);
    this.process = data.process;
    console.log(this.process);
  }

  async update(): Promise<void> {
    super.update();
    if (this.isOnRepeatButton()) {
      Sounds.getInstance.repeatDialog();
      this.unConfirm();
    } else if (Phaser.Input.Keyboard.JustDown(this.rightKey)) {
      Howler.stop();
      Sounds.getInstance.playNormalBgm();
      Sounds.getInstance.progress = Sounds.getInstance.progress + 1;
    }
    switch (this.process) {
      case -1:
        if (Sounds.getInstance.progress === 1) {
          this.process++;
        } else {
          Sounds.getInstance.playDialog();
        }
        break;
      case 0:
        if (Sounds.getInstance.progress === 3) {
          Sounds.getInstance.changeToVillage();
          this.process++;
        } else {
          Sounds.getInstance.playDialog();
        }
        break;
      case 1:
        if (Phaser.Input.Keyboard.JustDown(this.upKey)) {
          await Sounds.getInstance.playHitSound();
          this.process++;
        }
        break;
      case 2:
        // soundeffect01
        // voiceover02
        // dialog02
        if (Sounds.getInstance.progress === 6) {
          this.process++;
        } else {
          Sounds.getInstance.playDialog();
        }
        break;
      case 3:
        if (Phaser.Input.Keyboard.JustDown(this.downKey)) {
          Sounds.getInstance.playOnGetFood();
          this.process++;
        }
        break;
      case 4:
        // voiceover03
        if (Sounds.getInstance.progress === 7) {
          Sounds.getInstance.changeToForest();
          this.process++;
        } else {
          Sounds.getInstance.playDialog();
        }
        break;
      case 5:
        // soundeffect02
        // dialog03
        // voiceover04.1
        if (Sounds.getInstance.progress === 8) {
          this.unConfirm();
          this.process++;
        } else {
          Sounds.getInstance.playDialog();
        }
        break;
      case 6:
        if (this.isConfirm()) {
          Sounds.getInstance.playOnGetFood();
          this.unConfirm();
          this.process++;
        }
        break;
      case 7:
        if (Sounds.getInstance.progress === 9) {
          this.process++;
        } else {
          Sounds.getInstance.playDialog();
        }
        break;
      case 8:
        if (Phaser.Input.Keyboard.JustDown(this.downKey)) {
          Sounds.getInstance.playOnGetFood();
          this.process++;
        }
        break;
      case 9:
        if (Sounds.getInstance.progress === 10) {
          this.process++;
        } else {
          Sounds.getInstance.playDialog();
        }
        break;
      case 10:
        if (this.isConfirm()) {
          Sounds.getInstance.playOnGetFood();

          this.unConfirm();
          this.process++;
        }
        break;
      case 11:
        // dialog04
        // voiceover05
        if (Sounds.getInstance.progress === 12) {
          this.process++;
        } else {
          Sounds.getInstance.playDialog();
        }
        break;
      case 12:
        if (this.isTripleClick()) {
          new collectEther().do();
          this.unConfirm();
          this.process++;
        }
        break;
      case 13:
        // dialog05
        // voiceover06
        // dialog06
        if (Sounds.getInstance.progress === 15) {
          console.log("progess: 15!!!!!");
          this.process++;
        } else {
          Sounds.getInstance.playDialog();
        }
        break;
      case 14:
        if (Phaser.Input.Keyboard.JustDown(this.upKey)) {
          Sounds.getInstance.playOnGetFood();
          this.scene.start("AdventureScene", {
            player: Player.getInstance,
            init: true,
          });
        }
        break;
      default:
        break;
    }
  }
}
