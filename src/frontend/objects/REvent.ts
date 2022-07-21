import { Player } from "./Player";
import { howler, Howl } from "howler";

enum EventType {
  Food = "Food",
  Ether = "Ether",
  Animal = "Animal",
  Monster = "Monster",
  Ruins = "Ruins",
}

export class REvent {
  private player: Player;
  private eventType: EventType;
  private sound: Howl;
  constructor(eventType: EventType) {
    this.eventType = eventType;
    this.sound = new Howl({
      src: ["./sounds/" + this.eventType + ".wav"],
      autoplay: true,
      loop: true,
    });
  }
  adjustVolume(value: number) {
    this.sound.volume(value);
  }
}
