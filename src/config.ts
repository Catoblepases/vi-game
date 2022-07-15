import { BootScene } from "./scenes/boot-scene";
import { PolicyScene } from "./scenes/policy-scene";
import { HouseScene } from "./scenes/house-scene";
import { MainMenuScene } from "./scenes/main-menu-scene";
import { AdventureScene } from "./scenes/adventure-scene";
import { EtherScene } from "./scenes/ether-scene";

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: "RandomLand",
  url: "https://github.com/Catoblespases/vi-game",
  version: "2.0",
  width: 256,
  height: 224,
  zoom: 3,
  type: Phaser.AUTO,
  parent: "game",
  scene: [
    BootScene,
    MainMenuScene,
    HouseScene,
    PolicyScene,
    AdventureScene,
    EtherScene,
  ],
  input: {
    keyboard: true,
    mouse: false,
    touch: false,
    gamepad: false,
  },
  backgroundColor: "#000000",
  render: { pixelArt: true, antialias: false },
};
