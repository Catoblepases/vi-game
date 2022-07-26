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

  private voiceover01: Howl;
  private voiceover02: Howl;
  private voiceover03: Howl;
  private voiceover04_1: Howl;
  private voiceover04_2: Howl;
  private voiceover04_3: Howl;
  private voiceover05: Howl;
  private voiceover06: Howl;

  private adventureBgm: Howl;
  private villageBgm: Howl;

  private bgm: Howl;

  //if there's different monster sound then use the other two additionals
  private monsterA: Howl;
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

  private bools: boolean[];

  calculSoundsPosition(playPos: Position, evtPos: Position) {
    return new Position(
      (evtPos.x - playPos.x) * CONST.SOUND_DISTANCE_MULTIPLIER,
      (evtPos.y - playPos.y) * CONST.SOUND_DISTANCE_MULTIPLIER
    );
  }

  volumeRate(position: Position) {
    const d =
      Math.sqrt(position.distance()) / (2 * CONST.SOUND_DISTANCE_MULTIPLIER);
    return Math.exp(-1 * d);
  }

  setPosition(sound: Howl, playPos: Position, evtPos: Position) {
    const position = this.calculSoundsPosition(playPos, evtPos);
    const volume = this.volumeRate(position);
    sound.stop();
    console.log(position + " " + volume);
    sound.volume(volume);
    sound.pos(position.x, position.y, 0, sound.play());
  }

  createDialog(filename: string) {
    return new Howl({
      src: [filename],
      volume: 0.7,
      loop: false,
      rate: 1,
      onplay: () => {
        console.log("progress: " + this.progress + " play " + filename);
      },
      onend: () => {
        this.progressing();
        if (this.bgm) {
          this.bgm.volume(0.5);
        }
        console.log("progress: " + this.progress + " stop " + filename);
      },
    });
  }

  createSoundEffect(filename: string) {
    return new Howl({
      src: [filename],
      volume: 0.6,
      loop: false,
    });
  }

  createContinueObjectSound(filename: string) {
    return new Howl({
      src: [filename],
      loop: true,
      volume: 0.5,
    });
  }

  constructor() {
    this._progress = 0;
    this.bools = [];
    for (let i = 0; i < 100; i++) {
      this.bools.push(true);
    }
    this.dialog01 = this.createDialog("./sounds/dialog01.wav");
    this.dialog02 = this.createDialog("./sounds/dialog02.wav");
    this.dialog03 = this.createDialog("./sounds/dialog03.wav");
    this.dialog04 = this.createDialog("./sounds/dialog04.wav");
    this.dialog05 = this.createDialog("./sounds/dialog05.wav");
    this.dialog06 = this.createDialog("./sounds/dialog06.wav");
    this.animal1dialog = this.createDialog("./sounds/animal1dialog.wav");
    this.animal2dialog = this.createDialog("./sounds/animal2dialog.wav");
    this.animal3dialog = this.createDialog("./sounds/animal3dialog.wav");

    this.voiceover01 = this.createDialog("./sounds/voiceover01.wav");
    this.voiceover02 = this.createDialog("./sounds/voiceover02.wav");
    this.voiceover03 = this.createDialog("./sounds/voiceover03.wav");
    this.voiceover04_1 = this.createDialog("./sounds/voiceover04.1.wav");
    this.voiceover04_2 = this.createDialog("./sounds/voiceover04.2.wav");
    this.voiceover04_3 = this.createDialog("./sounds/voiceover04.3.wav");
    this.voiceover05 = this.createDialog("./sounds/voiceover05.wav");
    this.voiceover06 = this.createDialog("./sounds/voiceover06.wav");

    this.adventureBgm = new Howl({
      src: ["./sounds/forest.mp3"],
      loop: true,
      volume: 0.5,
    });

    this.villageBgm = new Howl({
      src: ["./sounds/hut.mp3"],
      volume: 0.6,
      loop: true,
    });

    this.monsterA = this.createContinueObjectSound("./sounds/monster.wav");
    this.monsterB = this.createContinueObjectSound("./sounds/monster.wav");
    this.monsterC = this.createContinueObjectSound("./sounds/monster.wav");

    this.animal1 = this.createContinueObjectSound("./sounds/squirrel.wav");
    this.animal2 = this.createContinueObjectSound("./sounds/animal2.wav");
    this.animal3 = this.createContinueObjectSound("./sounds/animal3.wav");

    this.onGetFood = this.createSoundEffect("./sounds/collectSuccess.wav");
    this.onGetEtherResources = this.createSoundEffect(
      "./sounds/collectEther.wav"
    );
  }

  openning() {
    this.dialog01.play();
    var id1 = this.dialog01.play();
  }

  playNormalBgm() {
    if (this.bgm) {
      this.bgm.volume(0.3);
      this.bgm.play();
    }
  }

  changeToForest() {
    if (this.bgm && this.bgm.playing()) {
      this.bgm.fade(0.5);
    }
    this.bgm = this.adventureBgm;
    this.playNormalBgm();
  }

  changeToVillage() {
    if (this.bgm && this.bgm.playing()) {
      this.bgm.fade(0.5);
    }
    this.bgm = this.villageBgm;
    this.playNormalBgm();
  }

  playDialog() {
    const dialogs = [
      this.dialog01,
      this.voiceover01,
      this.voiceover02,
      this.dialog02,
      this.voiceover03,
      this.dialog03,
      this.voiceover04_1,
      this.voiceover04_2,
      this.voiceover04_3,
      this.dialog04,
      this.voiceover05,
      this.dialog05,
      this.voiceover06,
      this.dialog06,
      this.animal1dialog,
      this.animal2dialog,
      this.animal3dialog,
    ];
    var play: boolean = this.bools[this.progress];
    for (let i = 0; i < dialogs.length; i++) {
      const sound = dialogs[i];
      if (sound.playing()) {
        play = false;
      }
    }

    if (play) {
      if (this.bgm) {
        this.bgm.volume(0.2);
      }
      dialogs[this.progress].play();
      this.bools[this.progress] = false;
    }
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
    this.changeMonsterA(evtPos);
  }
  changeMonsterA(evtPos: Position) {
    this.setPosition(this.monsterA, Player.getInstance.getPosition, evtPos);
  }
  playMonsterB(evtPos: Position) {
    this.monsterB.play();
    this.changeMonsterB(evtPos);
  }
  changeMonsterB(evtPos: Position) {
    this.setPosition(this.monsterB, Player.getInstance.getPosition, evtPos);
  }

  playMonsterC(evtPos: Position) {
    this.changeMonsterC(evtPos);
    this.monsterC.play();
  }

  changeMonsterC(evtPos: Position) {
    this.setPosition(this.monsterC, Player.getInstance.getPosition, evtPos);
  }

  playAnimal1(evtPos: Position) {
    this.animal1.play();
    this.changeAnimal1(evtPos);
  }

  changeAnimal1(evtPos: Position) {
    this.setPosition(this.animal1, Player.getInstance.getPosition, evtPos);
  }

  playAnimal2(evtPos: Position) {
    this.animal2.play();
    this.changeAnimal2(evtPos);
  }

  changeAnimal2(evtPos: Position) {
    this.setPosition(this.animal2, Player.getInstance.getPosition, evtPos);
  }

  playAnimal3(evtPos: Position) {
    this.animal3.play();
    this.changeAnimal3(evtPos);
  }
  changeAnimal3(evtPos: Position) {
    this.setPosition(this.animal3, Player.getInstance.getPosition, evtPos);
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

  set progress(p: number) {
    this._progress = p;
  }
}
