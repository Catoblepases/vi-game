import { Sounds } from "../objects/Sounds";
import { Howler, Howl } from "howler";

export class EndScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'EndScene'
        });
    }

    init(data: any) {

        Howler.stop();
        setTimeout(() => {
            Sounds.getInstance.ending.play();
        }, 3000);
    }

    update(): void {
    }
}
