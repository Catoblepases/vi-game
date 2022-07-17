export class Map {
  private map: Event[][];
  constructor(size: number) {
    this.map = new Event[size][size]();
  }
}
