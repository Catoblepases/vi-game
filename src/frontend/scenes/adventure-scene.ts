import { CONST } from "../const/const";
import { Player } from "../objects/Player";
import { createTextAuto } from "../utils/createMenu";
import { speak } from "../utils/reader";
import { AllEvents } from "../objects/AllEvents";
import { Position } from "../objects/Position";
import { REvent } from "../objects/REvent";
import { MapWithReader } from "../utils/map";

export class AdventureScene extends MapWithReader {
  constructor() {
    super("AdventureScene");
  }

  init(data: any): void {
    super.init(data);
  }

  preload(): void {
  }

  create(): void {}

  update(): void {
    super.update();
  }
  checkEvent(){
    switch(this.allEvents.getEvent(this.position.x,this.position.y)?.event){
      case 1:
        this.player.setEther(this.player.getEther()+1);
      case 2:
        this.player.setFood(this.player.getFood()+1);
      case 3:
        this.player.setEther(0);
        this.player.setFood(0);
      case 4:
        


    }

  }
}
