import { Reader } from "./reader";

export function createTextAuto(scene: Reader) {
  var initHPos = scene.sys.canvas.height / 2 - 10;
  var distanceChoice =
    (scene.sys.canvas.height - initHPos - 10) / scene.getChoices().length;

  for (let i = 0; i < scene.getChoices().length; i++) {
    scene.addToBitmapTexts(
      scene.add.bitmapText(
        scene.sys.canvas.width / 2 - 30,
        initHPos + distanceChoice * i,
        "sysFont",
        scene.getChoices()[i],
        8
      )
    );
  }
}
