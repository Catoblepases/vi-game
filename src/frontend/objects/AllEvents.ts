import { REvent } from "./REvent";
import { CONST } from "../const/const";

export class AllEvents {
  private events: REvent[][];

  constructor() {
    this.events = new REvent[CONST.MAP_SIZE][CONST.MAP_SIZE]();
  }
  
  getEvent(x:number,y:number ){
    if (x<=CONST.MAP_SIZE-1&&x>=0&&y<=CONST.MAP_SIZE-1&&y>=0){
      return this.events[x][y];
    }
  }

}
