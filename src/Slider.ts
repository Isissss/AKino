import * as PIXI from 'pixi.js'
import { Game } from './game'
import { MinusButton } from './MinusButton'
import { PlusButton } from './PlusButton'

export class Slider extends PIXI.Container {

    game: Game
    minusButton: MinusButton
    plusButton: PlusButton
    name: string
    value: number
    style: any
    displayName: PIXI.Text
    displayValue: PIXI.Text
    textures: PIXI.Texture[]
    margin: number = 10

    constructor(game: Game, name: string, value: number, increments: number, textures: PIXI.Texture[]) {
        super()
        this.name = name
        this.value = value
        this.textures = textures
        this.displayName = new PIXI.Text(this.name, this.style)
        this.minusButton = new MinusButton(this.game, this, increments, this.textures[0])
        this.minusButton.scale.set(3)
        this.plusButton = new PlusButton(this.game, this, increments, this.textures[1])
        this.plusButton.scale.set(3)
        this.displayValue = new PIXI.Text(`${this.value.toString()}`, this.style)
        this.minusButton.x = this.displayName.x + this.displayName.width + this.margin
        this.displayValue.x = this.minusButton.x + this.minusButton.width + this.margin
        this.plusButton.x = this.displayValue.x + this.displayValue.width + this.margin
        this.x = -25
        this.addChild(this.displayName, this.minusButton, this.plusButton, this.displayValue)
    }

    public update() {
        this.displayValue.style, this.displayName.style = this.style
        this.displayValue.text = this.value.toString()
        this.displayName.text = this.name
    }
}