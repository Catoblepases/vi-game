import { MapWithReader } from "../utils/map";
import { Howler, Howl } from "howler";
import { REvent } from "../objects/REvent";
import { AllEvents } from "../objects/AllEvents";

export class OpenScene extends MapWithReader {
  private process = 0;
  constructor() {
    super("OpenScene");
    this.allEvents = new AllEvents({
      events: [[REvent.createDefaultEvent()], [REvent.createDefaultEvent()]],
    });
  }

  proload() {}

  init(data: any): void {
    super.init(data);
    this.process = data.process;
    this.process++;
  }

  update(): void {
    super.update();
    switch (this.process) {
      case 0:
        // dialog01
        // voiceover01
        this.process++;
        break;
      case 1:
        if (Phaser.Input.Keyboard.JustDown(this.upKey)) {
          // soundeffect01
          // voiceover02
          // dialog02
          // voiceover03
          this.process++;
        }
        break;
      case 2:
        if (Phaser.Input.Keyboard.JustDown(this.downKey)) {
          // soundeffect02
          // dialog03
          // voiceover04.1
          this.process++;
        }
        break;
      case 3:
        if (this.isConfirm()) {
          // voiceover04.2
          this.process++;
        }
        break;
      case 4:
        if (Phaser.Input.Keyboard.JustDown(this.downKey)) {
          // voiceover04.3
          this.process++;
        }
        break;
      case 4:
        if (this.isConfirm()) {
          // dialog04
          // voiceover05
          this.player.collectFood();
          this.unConfirm();
          this.process++;
        }
        break;
      case 5:
        if (this.isTripleClick()) {
          this.player.collectEther();
          this.unConfirm();
          this.process++;
          // dialog05
          // voiceover06
          // dialog06
        }
        break;
      case 6:
        this.scene.start("AdventureScene", {
          player: this.player,
        });
        break;
      default:
        break;
    }
  }
}
