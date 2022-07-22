import {howler,Howl} from "howler"; 
import { AllEvents } from "./AllEvents";

export class Sounds{
    private dialog01 : Howl;
    private dialog02 : Howl;
    private dialog03 : Howl;
    private dialog04 : Howl;
    private dialog05 : Howl;
    private dialog06 : Howl;

    private adventureBgm: Howl;
    private villageBgm:Howl;
    private monsterA: Howl;
    //if there's different monster sound then use the other two additionals 
    private monsterB: Howl;
    private monsterC: Howl;

    private animal1:Howl;
    private animal2:Howl;
    private animal3:Howl;
    private animal1dialog:Howl;
    private animal2dialog:Howl;
    private animal3dialog:Howl;

    private progress:number;



    constructor(){
        this.progress=0;
        this.dialog01=new Howl({
            src:['dialog01.'], 
            volume:0.7,
            onstop:this.progressing()
        })
        this.dialog02=new Howl({
            src:['dialog02.'], 
        })
        this.dialog03=new Howl({
            src:['dialog03.'], 
        })
        this.dialog04=new Howl({
            src:['dialog04.'], 
        })
        this.dialog05=new Howl({
            src:['dialog05.'], 
        })
        this.dialog06=new Howl({
            src:['dialog06.'], 
        })
        this.adventureBgm=new Howl({
            src:['adventureBgm.'],
            loop:true,
            volume:0.5,

        })
        this.monsterA=new Howl({
            src:['monster1.'],
            volume:0.8,
            
        })
        this.animal1=new Howl({
            src:['animal1.'],
            volume:0.6
        })
        this.animal2=new Howl({
            src:['animal2.'],
            volume:0.6
        })
        this.animal3=new Howl({
            src:['animal3.'],
            volume:0.6
        })
        this.animal1dialog=new Howl({
            src:['animal1dialog.'],
            volume:0.6
        })
        this.animal2dialog=new Howl({
            src:['animal2dialog.'],
            volume:0.6
        })
        this.animal3dialog=new Howl({
            src:['animal3dialog.'],
            volume:0.6
        })
        this.villageBgm=new Howl({
            src:['villageBgm'],
            volume:0.6,
            loop:true
        })


    }
    openning(){
        this.dialog01.play();
        var id1 = this.dialog01.play();
        
    }

    adventure(){
        this.adventureBgm.play();
        var id = this.adventureBgm.play();
        

    }
    stopAdventureBgm(){
        this.adventureBgm.stop();
    }
    village(){
        this.villageBgm.play();
    }
    stopVillageBgm(){
        this.villageBgm.stop();
    }

    playMonsterA(x:number,y:number){
        this.monsterA.play();
        this.monsterA.pos(x,y,0);

    }
    playAnimal1(x:number,y:number){
        this.animal1.play();
        this.animal1.pos(x,y,0);
        
    }
    playAnimal2(x:number,y:number){
        this.animal1.play();
        this.animal1.pos(x,y,0);
        
    }
    playAnimal3(x:number,y:number){
        this.animal1.play();
        this.animal1.pos(x,y,0);
        
    }
    playAnimalDialog1(){
        this.animal1dialog.play();
    }
    playAnimalDialog2(){
        this.animal2dialog.play();
    }
    playAnimalDialog3(){
        this.animal3dialog.play();
    }
    progressing(){
        this.progress+=1;
    }
    getProgress(){
        return this.progress
    }



    

}