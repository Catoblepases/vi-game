import { Sounds } from "./Sounds";

export enum ProgressStory {
  animal1 = -1,
  animal2 = -2,
  animal3 = -3,
  monster = -4,
  BossFight = -5,
  AfterBossFight = -6,
  None = 0,
  animal2appear = -7,
}

export class animalOrMonsterProgress {
  public static _instance?: animalOrMonsterProgress; // Declare readonly static properties, store single instances

  static get getInstance() {
    // get this single instance by the get method, if there is no instance object created, if there is, then return this instance object directly
    if (!animalOrMonsterProgress._instance)
      animalOrMonsterProgress._instance = new animalOrMonsterProgress();
    return animalOrMonsterProgress._instance;
  }
  private _Allprogress: number;
  private _soundProgressRecord: number;

  constructor() {
    this.progress = 0;
  }
  changeToAnimal1() {
    this._Allprogress = -1;
    animalOrMonsterProgress.getInstance.SyncProgress();
  }

  changeToAnimal2appear() {
    this._Allprogress = -7;
    animalOrMonsterProgress.getInstance.SyncProgress();
  }

  changeToAnimal2() {
    this._Allprogress = -2;
    animalOrMonsterProgress.getInstance.SyncProgress();
  }
  changeToAnimal3() {
    this._Allprogress = -3;
    animalOrMonsterProgress.getInstance.SyncProgress();
  }
  changeToMonster() {
    this._Allprogress = -4;
    animalOrMonsterProgress.getInstance.SyncProgress();
  }
  changeToBoss() {
    this._Allprogress = -5;
    animalOrMonsterProgress.getInstance.SyncProgress();
  }

  changeToBossF() {
    this._Allprogress = -8;
    animalOrMonsterProgress.getInstance.SyncProgress();
  }
  changeToNone() {
    this._Allprogress = 0;
    animalOrMonsterProgress.getInstance.SyncProgress();
  }
  changeAfterBoss() {
    this._Allprogress = -6;
    animalOrMonsterProgress.getInstance.SyncProgress();
  }

  get progress() {
    return this._Allprogress;
  }

  set progress(p: number) {
    this._Allprogress = p;
  }

  SyncProgress() {
    this._soundProgressRecord = Sounds.getInstance.progress;
  }

  get getSoundProgressRecord() {
    return this.getSoundProgressRecord;
  }
}
