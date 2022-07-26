import { MapWithReader } from "../utils/map";
import { Howler, Howl } from "howler";
import { collectEther, collectFood, REvent } from "../objects/REvent";
import { AllEvents } from "../objects/AllEvents";
import { Sounds } from "../objects/Sounds";
import { Reader } from "../utils/reader";
import { Player } from "../objects/Player";

export class OpenScene extends Reader {
  private process = 0;

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

  update(): void {
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
      case 0:
        Sounds.getInstance.playDialog();
        if (Sounds.getInstance.progress === 2) {
          Sounds.getInstance.changeToVillage();
          this.process++;
        }
        break;
      case 1:
        if (Phaser.Input.Keyboard.JustDown(this.upKey)) {
          this.process++;
        }
        break;
      case 2:
        // soundeffect01
        // voiceover02
        // dialog02
        Sounds.getInstance.playDialog();
        if (Sounds.getInstance.progress === 4) {
          this.process++;
        }
        break;
      case 3:
        if (Phaser.Input.Keyboard.JustDown(this.downKey)) {
          this.process++;
        }
        break;
      case 4:
        // voiceover03
        Sounds.getInstance.playDialog();
        if (Sounds.getInstance.progress === 6) {
          this.process++;
        }
        break;
      case 5:
        // soundeffect02
        // dialog03
        // voiceover04.1
        Sounds.getInstance.playDialog();
        if (Sounds.getInstance.progress === 8) {
          this.process++;
        }
        break;
      case 6:
        if (this.isConfirm()) {
          this.unConfirm();
          this.process++;
        }
        break;
      case 7:
        Sounds.getInstance.playDialog();
        if (Sounds.getInstance.progress === 9) {
          this.process++;
        }
        break;
      case 8:
        if (Phaser.Input.Keyboard.JustDown(this.downKey)) {
          this.process++;
        }
        break;
      case 9:
        Sounds.getInstance.playDialog();
        if (Sounds.getInstance.progress === 10) {
          this.process++;
        }
        break;
      case 10:
        if (this.isConfirm()) {
          new collectFood().do();
          this.unConfirm();
          this.process++;
        }
        break;
      case 11:
        // dialog04
        // voiceover05
        Sounds.getInstance.playDialog();
        if (Sounds.getInstance.progress === 12) {
          this.process++;
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
        Sounds.getInstance.playDialog();
        if (Sounds.getInstance.progress === 14) {
          console.log("progess: 14!!!!!");
          this.process++;
        }
        break;
      case 14:
        this.scene.start("AdventureScene", {
          player: Player.getInstance,
          init: true,
        });
        break;
      default:
        break;
    }
  }
}
