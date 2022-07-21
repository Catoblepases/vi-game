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
  //event =0-> no event
  //event =1 -> collectEther 
  //event =2 ->collectFood
  //3-> monster 
  //4-> animal
  event : number;

  constructor(param:any) {
    let {event=0}=param;
    if (event===0) {
      this.event=0;
    }
    else{
      this.event=event;
    }
  }
  
}
