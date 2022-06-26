import * as PIXI from 'pixi.js'
import { Game } from './game';
import { Slider } from './Slider';

export class FontSizeSlider extends Slider {

    protected game : Game

    constructor(game: Game, name: string, value: number, increments: number, textures: PIXI.Texture[]){
        super(game, name, value, increments, textures)
        this.game = game        
    }

    public update() {
        this.game.fontSize = this.value
        this.game.textStyle.fontSize = this.game.fontSize
        super.update()
    }

}