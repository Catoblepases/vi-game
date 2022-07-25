import { howler, Howl } from "howler";
import { CONST } from "../const/const";
import { AllEvents } from "./AllEvents";
import { Player } from "./Player";
import { Position } from "./Position";

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class Sounds {
  private static _instance?: Sounds; // Declare private static properties, store single instances

  static get getInstance() {
    // get this single instance by the get method, if there is no instance object created, if there is, then return this instance object directly
    if (!Sounds._instance) Sounds._instance = new Sounds();
    return Sounds._instance;
  }

  private dialog01: Howl;
  private dialog02: Howl;
  private dialog03: Howl;
  private dialog04: Howl;
  private dialog05: Howl;
  private dialog06: Howl;

  private adventureBgm: Howl;
  private villageBgm: Howl;

  private monsterA: Howl;
  //if there's different monster sound then use the other two additionals
  private monsterB: Howl;
  private monsterC: Howl;

  private animal1: Howl;
  private animal2: Howl;
  private animal3: Howl;
  private animal1dialog: Howl;
  private animal2dialog: Howl;
  private animal3dialog: Howl;

  private onGetFood: Howl;
  private onGetEtherResources: Howl;

  private _progress: number;

  calculSoundsPosition(playPos: Position, evtPos: Position) {
    return new Position(
      (evtPos.x - playPos.x) * CONST.SOUND_DISTANCE_MULTIPLIER,
      (evtPos.y - playPos.y) * CONST.SOUND_DISTANCE_MULTIPLIER
    );
  }

  volumeRate(position: Position) {
    const d = Math.sqrt(position.distance());
    const Dmax = Math.sqrt(CONST.MAP_SIZE * CONST.MAP_SIZE);
    return d / Dmax;
  }

  setPosition(sound:Howl,playPos: Position, evtPos: Position){
    const position=this.calculSoundsPosition(playPos,evtPos);
    const volume=this.volumeRate(position);

  }

  constructor() {
    this._progress = 0;
    this.dialog01 = new Howl({
      src: ["./sounds/dialog01.wav"],
      volume: 0.7,
      onstop: () => {
        this.progressing();
      },
    });
    this.dialog02 = new Howl({
      src: ["./sounds/dialog02.wav"],
    });
    this.dialog03 = new Howl({
      src: ["./sounds/dialog03.wav"],
    });
    this.dialog04 = new Howl({
      src: ["./sounds/dialog04.wav"],
    });
    this.dialog05 = new Howl({
      src: ["./sounds/dialog05.wav"],
    });
    this.dialog06 = new Howl({
      src: ["./sounds/dialog06.wav"],
    });
    this.adventureBgm = new Howl({
      src: ["./sounds/adventureBgm.wav"],
      loop: true,
      volume: 0.5,
    });
    this.monsterA = new Howl({
      src: ["./sounds/monster.wav"],
      volume: 0.8,
      loop: true,
    });
    this.monsterB = new Howl({
      src: ["./sounds/monster.wav"],
      volume: 0.8,
      loop: true,
    });
    this.monsterC = new Howl({
      src: ["./sounds/monster.wav"],
      volume: 0.8,
      loop: true,
    });
    this.animal1 = new Howl({
      src: ["./sounds/squirrel.wav"],
      volume: 0.6,
    });
    this.animal2 = new Howl({
      src: ["./sounds/animal2.wav"],
      volume: 0.6,
    });
    this.animal3 = new Howl({
      src: ["./sounds/animal3.wav"],
      volume: 0.6,
    });

    this.animal1dialog = new Howl({
      src: ["./sounds/animal1dialog.wav"],
      volume: 0.6,
    });

    this.animal2dialog = new Howl({
      src: ["./sounds/animal2dialog.wav"],
      volume: 0.6,
    });

    this.animal3dialog = new Howl({
      src: ["./sounds/animal3dialog.wav"],
      volume: 0.6,
    });

    this.villageBgm = new Howl({
      src: ["./sounds/villageBgm.wav"],
      volume: 0.6,
      loop: true,
    });

    this.onGetFood = new Howl({
      src: ["./sounds/collectSuccess.wav"],
      volume: 0.6,
      loop: false,
      onstop: () => {
        this.progressing();
      },
    });

    this.onGetEtherResources = new Howl({
      src: ["./sounds/collectEther.wav"],
      volume: 0.6,
      loop: false,
      onstop: () => {
        this.progressing();
      },
    });
  }

  openning() {
    this.dialog01.play();
    var id1 = this.dialog01.play();
  }

  adventure() {
    this.adventureBgm.play();
    var id = this.adventureBgm.play();
  }
  stopAdventureBgm() {
    this.adventureBgm.stop();
  }
  village() {
    this.villageBgm.play();
  }
  stopVillageBgm() {
    this.villageBgm.stop();
  }
  async playOnGetFood() {
    this.onGetFood.play();
    await delay(this.onGetFood.duration());
  }
  async playOnGetEtherResources() {
    this.onGetEtherResources.play();
    await delay(this.onGetEtherResources.duration());
  }
  playMonsterA(evtPos: Position) {
    this.monsterA.play();
    // this.changeMonsterA(evtPos);
  }
  changeMonsterA(evtPos: Position) {
    const pos = this.calculSoundsPosition(
      Player.getInstance.getPosition,
      evtPos
    );
    this.monsterA.stop();
    this.monsterA.pos(pos.x, pos.y, 0, this.monsterA.play());
    console.log(pos);
  }
  playMonsterB(evtPos: Position) {
    this.monsterB.play();
    this.changeMonsterB(evtPos);
  }
  changeMonsterB(evtPos: Position) {
    const pos = this.calculSoundsPosition(
      Player.getInstance.getPosition,
      evtPos
    );
    this.monsterB.pos(pos.x, pos.y, 0);
  }

  playMonsterC(evtPos: Position) {
    this.changeMonsterC(evtPos);
    this.monsterC.play();
  }

  changeMonsterC(evtPos: Position) {
    const pos = this.calculSoundsPosition(
      Player.getInstance.getPosition,
      evtPos
    );
    this.monsterC.pos(pos.x, pos.y, 0);
  }
  playAnimal1(evtPos: Position) {
    const pos = this.calculSoundsPosition(
      Player.getInstance.getPosition,
      evtPos
    );
    this.animal1.play();
    this.animal1.pos(pos.x, pos.y, 0);
  }
  playAnimal2(evtPos: Position) {
    const pos = this.calculSoundsPosition(
      Player.getInstance.getPosition,
      evtPos
    );
    this.animal1.play();
    this.animal1.pos(pos.x, pos.y, 0);
  }
  playAnimal3(evtPos: Position) {
    const pos = this.calculSoundsPosition(
      Player.getInstance.getPosition,
      evtPos
    );
    this.animal1.play();
    this.animal1.pos(pos.x, pos.y, 0);
  }
  playAnimalDialog1() {
    this.animal1dialog.play();
  }
  playAnimalDialog2() {
    this.animal2dialog.play();
  }
  playAnimalDialog3() {
    this.animal3dialog.play();
  }
  progressing() {
    this._progress += 1;
  }
  get progress() {
    return this._progress;
  }
}
