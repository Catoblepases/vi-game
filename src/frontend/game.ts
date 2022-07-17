import "phaser";
import { setGameConfig } from "./config";

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

const GameConfig = setGameConfig();

window.addEventListener("load", () => {
  const game = new Game(GameConfig);
});
