import { REvent } from "./REvent";

export class Position {
  private x: number;
  private y: number;
}

export class Map {
  private map: REvent[][];
  private currentCase: Position;
  constructor(size: number) {
    this.map = new REvent[size][size]();
  }
}
