import { CONST } from "../const/const";

export class Position {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  moveUp(): boolean {
    if (this.y < CONST.MAP_SIZE - 1) {
      this.y += 1;
      return true;
    } else {
      return false;
    }
  }

  moveDown(): boolean {
    if (this.y > 1) {
      this.y -= 1;
      return true;
    } else {
      return false;
    }
  }

  moveLeft(): boolean {
    if (this.x > 1) {
      this.x -= 1;
      return true;
    } else {
      return false;
    }
  }

  moveRight(): boolean {
    if (this.x < CONST.MAP_SIZE - 1) {
      this.x += 1;
      return true;
    } else {
      return false;
    }
  }
}
