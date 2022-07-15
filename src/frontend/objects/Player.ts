import { Reader, speak } from "../utils/reader";

export enum Policy {
  Balance = "Balance",
  MoreFood = "More Food",
  MoreEther = "More Ether",
  AllFood = "All Food",
  AllEther = "All Ether",
}

export const policys: Map<string, number[]> = new Map();
policys.set(Policy.Balance, [0.5, 0.5]);
policys.set(Policy.MoreEther, [0.5, 0.5]);
policys.set(Policy.MoreFood, [0.5, 0.5]);
policys.set(Policy.AllEther, [0, 1]);
policys.set(Policy.AllFood, [1, 0]);

export class Player {
  private time: number;
  private ether: number;
  private houses: number;
  private progress: number;
  private foods: number;
  private policy: string;

  private residents: number;

  constructor() {
    this.time = 0;
    this.ether = 2;
    this.houses = 0;
    this.foods = 0;
    this.progress = 0;
    this.residents = 0;
    this.policy = Policy.Balance;
  }

  newDay() {
    this.time++;
    // this.ether += policys.get(this.policy)[1] * this.residents;
    // this.foods += policys.get(this.policy)[0] * this.residents;
  }

  changePolicy(p: string) {
    this.policy = p;
  }

  collectEther() {
    const amount = Math.round(Math.random() * 4) + 1;
    this.ether += amount;
    speak("add " + amount + " ether");
  }

  collectFood() {
    const amount = Math.round(Math.random() * 2) + 1;
    this.foods += amount;
    speak("add " + amount + " food");
  }

  toString(): string {
    var out = "";
    out +=
      "day " +
      this.time +
      ". There are a total of " +
      this.ether +
      " Ether, " +
      this.houses +
      " houses, " +
      this.residents +
      " inhabitants, " +
      this.foods +
      " food, and your adventure progress is " +
      this.progress +
      ", your policy is" +
      this.policy;
    return out;
  }

  toInfoSimple() {
    return (
      "food:" +
      this.foods +
      " " +
      "ether: " +
      this.ether +
      "\n" +
      "house:" +
      this.houses +
      " " +
      "residents: " +
      this.residents
    );
  }

  getFood() {
    return this.foods;
  }
  getEther() {
    return this.ether;
  }
  getHouse() {
    return this.houses;
  }
  getResidents() {
    return this.residents;
  }
}
