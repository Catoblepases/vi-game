import { CONST } from "../const/const";

export class Position {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  moveUp() {
    if (this.y < CONST.MAP_SIZE - 1) {
      this.y += 1;
    }
  }
  moveDown() {
    if (this.y > 1) {
      this.y -= 1;
    }
  }
  moveLeft() {
    if (this.x > 1) {
      this.x -= 1;
    }
  }
  moveRight() {
    if (this.x < CONST.MAP_SIZE - 1) {
      this.x += 1;
    }
  }
}
