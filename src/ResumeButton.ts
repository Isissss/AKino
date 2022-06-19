import * as PIXI from 'pixi.js'
import { StartButton } from './StartButton';
import { Game } from './game';

export class ResumeButton extends StartButton {

    constructor(game: Game, textures: PIXI.Texture[], name:string, x:number = 0, y:number = 0) {
        super(game,textures, name, x, y)
    }

    public buttonClicked() {
        // load saved game

        //use StartButton's on click behaviour to start game
        super.buttonClicked()
    }
}