import { REvent } from "./REvent";

export class Position {
  public x: number;
  public y: number;
}

export class Map {
  private map: REvent[][];

  constructor(size: number) {
    this.map = new REvent[size][size]();
  }

  changeNumber(amount: number, final: number, max: number) {
    if (final + amount < max && final + amount >= 0) {
      final = final + amount;
    } else if (final + amount >= max) {
      final = final + amount - max;
    } else if (final + amount < 0) {
      final = final + amount + max;
    }
  }

  up() {}

  down() {}

  left() {}

  right() {}
  
}
