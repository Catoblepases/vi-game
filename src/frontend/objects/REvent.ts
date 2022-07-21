import { Player } from "./Player";
import { howler, Howl } from "howler";

export enum EventType {
  Food = "Food",
  Ether = "Ether",
  Animal = "Animal",
  Monster = "Monster",
  Ruins = "Ruins",
  None = "None",
}

export class REvent {
  private player: Player;
  private eventType: EventType;
  private sound: Howl;
  constructor(param: any) {
    let { eventType = EventType.None } = param;
    this.eventType = eventType;
    if (this.eventType != EventType.None) {
      this.sound = new Howl({
        src: ["./sounds/" + this.eventType + ".wav"],
        autoplay: true,
        loop: true,
      });
    }
  }
  adjustVolume(value: number) {
    this.sound.volume(value);
  }
}
