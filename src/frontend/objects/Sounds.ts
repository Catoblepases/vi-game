import { Howler, Howl } from "howler";
import { Sound } from "phaser";
import { CONST } from "../const/const";
import { AllEvents } from "./AllEvents";
import { animalOrMonsterProgress } from "./animalOrMonsterProgress";
import { Player } from "./Player";
import { Position } from "./Position";

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class Sounds {
  public static _instance?: Sounds; // Declare readonly static properties, store single instances
  readonly footstep: Howl;

  static get getInstance() {
    // get this single instance by the get method, if there is no instance object created, if there is, then return this instance object directly
    if (!Sounds._instance) Sounds._instance = new Sounds();
    return Sounds._instance;
  }

  readonly audio: Howl;

  readonly dialog01: Howl;
  readonly dialog02: Howl;
  readonly dialog03: Howl;
  readonly dialog04: Howl;
  readonly dialog05: Howl;
  readonly dialog06: Howl;

  readonly voiceover01: Howl;
  readonly voiceover02: Howl;
  readonly voiceover03: Howl;
  readonly voiceover04_1: Howl;
  readonly voiceover04_2: Howl;
  readonly voiceover04_3: Howl;
  readonly voiceover05: Howl;
  readonly voiceover06: Howl;

  readonly adventureBgm: Howl;
  readonly villageBgm: Howl;
  readonly BattleBossBgm: Howl;
  readonly BossBgm: Howl;

  private bgm: Howl;

  readonly attackInstraction: Howl;
  readonly meetMonster: Howl;
  readonly afterMonster: Howl;

  //if there's different monster sound then use the other two additionals
  readonly monsterA: Howl;
  readonly monsterB: Howl;
  readonly monsterC: Howl;

  readonly animal1: Howl;
  readonly animal2: Howl;
  readonly animal3: Howl;
  readonly animal11dialog: Howl;
  readonly animal12dialog: Howl;
  readonly animal21dialog: Howl;
  readonly animal22dialog: Howl;
  readonly animal3dialog: Howl;
  readonly animal3dialog04: Howl;
  readonly animal3dialog05: Howl;

  readonly hitSound: Howl;
  readonly ivyWoo: Howl;
  readonly sucessSound: Howl;

  readonly onGetFood: Howl;
  readonly onGetEtherResources: Howl;

  private _progress: number;
  private dialogs: Howl[];
  private soundEffects: Howl[];
  private continueObjects: Howl[];

  readonly bools: boolean[];

  static calculSoundsPosition(playPos: Position, evtPos: Position) {
    if (!playPos || !evtPos) {
      return;
    }
    return new Position(
      (-1 * evtPos.x + playPos.x) * CONST.SOUND_DISTANCE_MULTIPLIER,
      (-1 * evtPos.y + playPos.y) * CONST.SOUND_DISTANCE_MULTIPLIER
    );
  }

  volumeRate(position: Position) {
    const d =
      Math.sqrt(position.distance()) / (2 * CONST.SOUND_DISTANCE_MULTIPLIER);
    return Math.exp(-1 * d) + 0.3;
  }

  setPosition(sound: Howl, playPos: Position, evtPos: Position) {
    const position = Sounds.calculSoundsPosition(playPos, evtPos);
    if (!position) {
      return;
    }
    // const volume = this.volumeRate(position);
    sound.stop();
    console.log(position);
    // sound.volume(volume);
    sound.pos(position.x, position.y, 0, sound.play());
  }

  createDialog(filename: string) {
    return new Howl({
      src: [filename],
      volume: 0.3,
      loop: false,
      rate: 2,
      onplay: () => {
        animalOrMonsterProgress.getInstance.SyncProgress();
        console.log("progress: " + this.progress + " play " + filename);
        this.silenceTheNoise();
      },
      onend: () => {
        this.progressing();
        this.normaliseTheNoise();
        console.log("progress: " + this.progress + " stop " + filename);
      },
    });
  }

  createDialogOut(filename: string) {
    return new Howl({
      src: [filename],
      volume: 0.3,
      loop: false,
      rate: 2,
      onplay: () => {
        console.log("progress: " + this.progress + " play " + filename);
        this.silenceTheNoise();
      },
      onend: () => {
        this.normaliseTheNoise();
        console.log("progress: " + this.progress + " stop " + filename);
      },
    });
  }

  createSoundEffect(filename: string) {
    return new Howl({
      src: [filename],
      volume: 0.1,
      loop: false,
    });
  }

  createContinueObjectSound(filename: string) {
    return new Howl({
      src: [filename],
      loop: true,
      volume: 1,
    });
  }

  constructor() {
    this._progress = 0;
    this.bools = [];
    for (let i = 0; i < 100; i++) {
      this.bools.push(true);
    }
    this.audio = this.createDialog("./sounds/audio.wav");
    this.dialog01 = this.createDialog("./sounds/dialog01.wav");
    this.dialog02 = this.createDialog("./sounds/dialog02.wav");
    this.dialog03 = this.createDialog("./sounds/dialog03.wav");
    this.dialog04 = this.createDialog("./sounds/dialog04.wav");
    this.dialog05 = this.createDialog("./sounds/dialog05.wav");
    this.dialog06 = this.createDialog("./sounds/dialog06.wav");
    this.animal11dialog = this.createDialog("./sounds/animal1dialog1.wav");
    this.animal12dialog = this.createDialog("./sounds/animal1dialog2.wav");
    this.animal21dialog = this.createDialog("./sounds/animal2dialog1.wav");
    this.animal22dialog = this.createDialog("./sounds/animal2dialog2.wav");
    this.animal3dialog = this.createDialog("./sounds/animal3dialog.wav");
    this.animal3dialog04 = this.createDialog("./sounds/animal3dialog04.wav");
    this.animal3dialog05 = this.createDialog(
      "./sounds/animal3dialog05final.wav"
    );

    this.hitSound = this.createSoundEffect("./sounds/hit.wav");
    this.ivyWoo = this.createSoundEffect("./sounds/ivy_woo.wav");
    this.footstep = this.createSoundEffect("./sounds/footstep.wav");
    this.sucessSound = this.createSoundEffect("./sounds/collectSuccess.wav");

    this.voiceover01 = this.createDialog("./sounds/voiceover01.wav");
    this.voiceover02 = this.createDialog("./sounds/voiceover02.wav");
    this.voiceover03 = this.createDialog("./sounds/voiceover03.wav");
    this.voiceover04_1 = this.createDialog("./sounds/voiceover04.1.wav");
    this.voiceover04_2 = this.createDialog("./sounds/voiceover04.2.wav");
    this.voiceover04_3 = this.createDialog("./sounds/voiceover04.3.wav");
    this.voiceover05 = this.createDialog("./sounds/voiceover05.wav");
    this.voiceover06 = this.createDialog("./sounds/voiceover06.wav");

    this.meetMonster = this.createDialogOut("./sounds/dialog07.wav");
    this.afterMonster = this.createDialogOut("./sounds/dialog08.wav");
    this.attackInstraction = this.createDialogOut(
      "./sounds/attackInstruction.wav"
    );

    this.adventureBgm = new Howl({
      src: ["./sounds/forest.mp3"],
      loop: true,
      volume: 0.05,
    });

    this.villageBgm = new Howl({
      src: ["./sounds/hut.mp3"],
      volume: 0.4,
      loop: true,
    });

    this.BattleBossBgm = new Howl({
      src: ["./sounds/BattleBoss.mp3"],
      volume: 0.3,
      loop: true,
    });

    this.BossBgm = new Howl({
      src: ["./sounds/Boss.mp3"],
      volume: 0.3,
      loop: true,
    });

    this.monsterA = this.createContinueObjectSound("./sounds/monster.wav");
    this.monsterB = this.createContinueObjectSound("./sounds/monster.wav");
    this.monsterC = this.createContinueObjectSound("./sounds/monster.wav");

    this.animal1 = this.createContinueObjectSound("./sounds/animal1.wav");
    this.animal2 = this.createContinueObjectSound("./sounds/animal2.wav");
    this.animal3 = this.createContinueObjectSound("./sounds/animal3.wav");

    this.onGetFood = this.createSoundEffect("./sounds/collectSuccess.wav");
    this.onGetEtherResources = this.createSoundEffect(
      "./sounds/collectEther.wav"
    );

    this.dialogs = [
      this.audio,
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
      this.animal11dialog,
      this.animal12dialog,
      this.animal21dialog,
      this.animal22dialog,
      this.animal3dialog,
      this.animal3dialog04,
      this.animal3dialog05,
    ];

    this.continueObjects = [
      this.monsterA,
      this.monsterB,
      this.monsterC,
      this.animal1,
      this.animal2,
      this.animal3,
    ];

    this.soundEffects = [];
  }

  openning() {
    this.dialog01.play();
    var id1 = this.dialog01.play();
  }

  playNormalBgm() {
    if (this.bgm) {
      this.bgm.volume(0.1);
      this.bgm.play();
    }
  }

  async playHitSound() {
    this.hitSound.play();
    setTimeout(() => {
      this.ivyWoo.play();
    }, 500);
    await delay(1000);
  }

  changeToForest() {
    if (this.bgm && this.bgm.playing()) {
      this.bgm.stop();
    }
    this.bgm = this.adventureBgm;
    this.bgm.volume(0.06);
    this.bgm.play();
  }

  changeToVillage() {
    if (this.bgm && this.bgm.playing()) {
      this.bgm.stop();
    }
    this.bgm = this.villageBgm;
    this.bgm.volume(0.2);
    this.bgm.play();
  }

  changeToBoss() {
    if (this.bgm && this.bgm.playing()) {
      this.bgm.stop();
    }
    this.bgm = this.BattleBossBgm;
    this.bgm.volume(0.2);
    this.bgm.play();
  }

  changeToBossAppear() {
    if (this.bgm && this.bgm.playing()) {
      this.bgm.stop();
    }
    this.bgm = this.BossBgm;
    this.bgm.volume(0.2);
  }

  successGesture() {
    this.sucessSound.play();
  }

  repeatDialog() {
    Howler.stop();
    this.playNormalBgm();
    if (this.bgm) {
      this.bgm.volume(0.05);
    }
    this.progress--;
    this.dialogs[this.progress].play();
  }

  playDialog() {
    this.silenceTheNoise();
    var play: boolean =
      this.bools[this.progress] && this.dialogs[this.progress];
    for (let i = 0; i < this.dialogs.length; i++) {
      const sound = this.dialogs[i];
      if (sound && sound.playing()) {
        play = false;
      }
    }

    if (play) {
      if (this.bgm) {
        this.bgm.volume(0.1);
      }
      this.dialogs[this.progress].play();
      this.bools[this.progress] = false;
    }
    this.normaliseTheNoise();
  }

  playDialogSpecific(sound: Howl) {
    var play: boolean = true;
    for (let i = 0; i < this.dialogs.length; i++) {
      const sound = this.dialogs[i];
      if (sound && sound.playing()) {
        play = false;
      }
    }
    if (play) {
      sound.play();
    }
  }

  silenceTheNoise() {
    for (let i = 0; i < this.continueObjects.length; i++) {
      const element = this.continueObjects[i];
      element.volume(0.1);
    }
    for (let i = 0; i < this.soundEffects.length; i++) {
      const element = this.soundEffects[i];
      element.volume(0.1);
    }
    if (this.bgm) {
      this.bgm.volume(0.04);
    }
  }

  normaliseTheNoise() {
    for (let i = 0; i < this.continueObjects.length; i++) {
      const element = this.continueObjects[i];
      element.volume(1);
    }
    for (let i = 0; i < this.soundEffects.length; i++) {
      const element = this.soundEffects[i];
      element.volume(0.6);
    }
    if (this.bgm) {
      this.bgm.volume(0.08);
    }
  }

  async playOnGetFood() {
    this.onGetFood.play();
    await delay(this.onGetFood.duration());
  }

  async playOnGetEtherResources() {
    this.onGetEtherResources.play();
    await delay(this.onGetEtherResources.duration() * 1000);
  }

  playMonsterA(evtPos: Position) {
    this.monsterA.play();
    this.changeMonsterA(evtPos);
  }
  changeMonsterA(evtPos: Position) {
    if (!this.monsterA.playing()) {
      this.monsterA.play();
    }
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
    if (!this.animal1.playing()) {
      this.animal1.play();
    }
    this.setPosition(this.animal1, Player.getInstance.getPosition, evtPos);
  }

  playAnimal2(evtPos: Position) {
    this.animal2.play();
    this.changeAnimal2(evtPos);
  }

  changeAnimal2(evtPos: Position) {
    if (!this.animal2.playing()) {
      this.animal2.play();
    }
    this.setPosition(this.animal2, Player.getInstance.getPosition, evtPos);
  }

  playAnimal3(evtPos: Position) {
    this.animal3.play();
    this.changeAnimal3(evtPos);
  }
  changeAnimal3(evtPos: Position) {
    if (!this.animal3.playing()) {
      this.animal3.play();
    }
    this.setPosition(this.animal3, Player.getInstance.getPosition, evtPos);
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
