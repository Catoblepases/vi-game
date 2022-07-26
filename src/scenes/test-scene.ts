import { Reader } from "../utils/reader";

export class TestScene extends Reader {
  constructor() {
    super("TestScene");
  }

  init(data: any): void {
    super.init(data);
    console.log("test");
  }

  update(): void {
    super.update();
    if (this.eventTriggered) {
      this.eventTriggered = false;
    }
  }
}
