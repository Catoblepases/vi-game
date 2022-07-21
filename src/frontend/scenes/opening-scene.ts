import { MapWithReader } from "../utils/map";
import { Howler, Howl } from "howler";
import { REvent } from "../objects/REvent";
import { AllEvents } from "../objects/AllEvents";

export class BootScene extends MapWithReader {
  private process = 0;
  constructor() {
    super("OpenningScene");
    this.allEvents = new AllEvents({
      events: [[new REvent({})], [new REvent({})]],
    });
  }

  proload() {}

  init(data: any): void {
    super.init(data);
    this.process = data.process;
    this.process++;
  }

  update(): void {
    if (this.process === 1 && Phaser.Input.Keyboard.JustDown(this.downKey)) {
      // Ghost13
      this.process++;
    }
    
    if (this.process == 3 && Phaser.Input.Keyboard.JustDown(this.downKey)) {
      // 15
      this.process++;
    }
  }
}
