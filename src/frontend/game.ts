import "phaser";
import { setGameConfig } from "./config";
import { Position } from "./objects/Position";

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

const GameConfig = setGameConfig();

window.addEventListener("load", () => {
  const game = new Game(GameConfig);
});

console.log(Position.ofString("(1,2)"));

