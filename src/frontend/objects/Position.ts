import { CONST } from "../const/const";

export class Position {
  private _x: number;
  private _y: number;

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }

  set x(_x: number) {
    this._x = _x;
  }
  set y(_y: number) {
    this._y = _y;
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return "(" + this.x + "," + this.y + ")";
  }

  moveUp(): boolean {
    if (this.y < CONST.MAP_SIZE - 1) {
      this.y = this.y + 1;
      return true;
    } else {
      return false;
    }
  }

  moveDown(): boolean {
    if (this.y > 1) {
      this.y = this.y - 1;

      return true;
    } else {
      return false;
    }
  }

  moveLeft(): boolean {
    if (this.x > 1) {
      this.x = this.x - 1;

      return true;
    } else {
      return false;
    }
  }

  moveRight(): boolean {
    if (this.x < CONST.MAP_SIZE - 1) {
      this.x = this.x + 1;
      return true;
    } else {
      return false;
    }
  }
}
