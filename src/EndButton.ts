import * as PIXI from 'pixi.js'
import { Game } from "./game";
import { StartButton } from "./StartButton";

export class EndButton extends StartButton {

    constructor(game: Game, textures: PIXI.Texture[], name:string, x:number = 0, y:number = 0){
        super(game, textures, name, x, y)
    }

    public buttonClicked() {
     window.location.reload()   
     }
    }