import { BootScene } from "./scenes/boot-scene";
import { PolicyScene } from "./scenes/policy-scene";
import { HouseScene } from "./scenes/house-scene";
import { MainMenuScene } from "./scenes/main-menu-scene";
import { AdventureScene } from "./scenes/adventure-scene";
import { EtherScene } from "./scenes/ether-scene";
import { MenuReader } from "./utils/menu-reader";
import { checkPlatform } from "./utils/check-sys";
import { Reader } from "./utils/reader";
import { OpenScene } from "./scenes/opening-scene";

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: "RandomLand",
  url: "https://github.com/Catoblespases/vi-game",
  version: "2.0",
  width: 256,
  height: 224,
  zoom: 1,
  type: Phaser.AUTO,
  parent: "game",
  scene: [
    BootScene,
    MainMenuScene,
    HouseScene,
    PolicyScene,
    AdventureScene,
    EtherScene,
    OpenScene,
  ],
  input: {
    keyboard: true,
    mouse: false,
    touch: true,
    gamepad: false,
  },
  backgroundColor: "#000000",
  render: { pixelArt: true, antialias: false },
};

export function setGameConfig(): Phaser.Types.Core.GameConfig {
  var config = GameConfig;
  const platform = checkPlatform();

  if (platform["isIos"] || platform["isAndroid"] || platform["isIphone"]) {
    config.height = 667;
    config.width = 375;
    config.title = "RANDOMLAND(touch)";
  } else {
    if (platform["isIpad"]) {
      config.title = "RANDOMLAND(touch)";
    } else {
      config.title = "RANDOMLAND(pc)";
    }
    config.height = 720;
    config.width = 1280;
  }

  console.log(config);

  return config;
}
