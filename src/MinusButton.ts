import * as PIXI from 'pixi.js'
import { Button } from './Button';
import { Game } from './game';
import { Slider } from './Slider';

export class MinusButton extends Button {
    public parent: Slider
    private increments: number

    constructor(game: Game, parent: Slider, increments: number, texture: PIXI.Texture) {
        super(game, [texture])
        this.parent = parent
        this.increments = increments
    }

    public buttonClicked() {
        if(this.parent.value > 0){
        this.parent.value = this.parent.value + (this.increments * -1)
        this.parent.update()
        }
    }
}