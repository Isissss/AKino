import * as PIXI from 'pixi.js'
import { Game } from './game';
import { Slider } from './Slider';

export class VolumeSlider extends Slider {

    game : Game

    constructor(game: Game, name: string, value: number, increments: number, textures: PIXI.Texture[]){
        super(game, name, value, increments, textures)
        this.game = game
        this.value = value * 100
        super.update()
        
    }

    public update() {
        switch (this.name){            
            case "Geluidseffecten":
                this.game.soundFXVolume = (this.value/100)
                this.game.updateVolume()
                break;
            case "Achtergrondmuziek":
                this.game.bgMusicVolume = (this.value/100)
                this.game.updateVolume()
                break;
            default:
                console.log("Slider Name not Valid")
                break;
        }
        super.update()
    }

}