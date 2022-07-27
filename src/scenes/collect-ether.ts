export class CollectScene extends Phaser.Scene {
  constructor() {
    super({
      key: "CollectScene",
    });
  }

  init() {
    this.input.addPointer(1);
    var pointer1 = this.input.pointer1;
    var pointer2 = this.input.pointer2;
  }

  update(): void {
    this.scene.start("CollectScene");
  }
}
