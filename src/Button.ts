import * as PIXI from "pixi.js"
import { Texture } from "pixi.js"
import { Game } from "./game"



export class Button extends PIXI.Sprite {
    // traits
    game: Game

    //behaviours
    constructor(game: Game,texture: Texture, x: number = 0, y: number = 0){
        super(texture)
        this.x = x
        this.y = y
        this.interactive = true
        this.buttonMode = true
        this.game = game
        console.log("Button Added")
        this.on('pointerdown', () => this.buttonClicked())

    }

    private buttonClicked(){
        console.log("Button Clicked")
        if(this.game.menuActive === false){
        this.game.menuActive = true
        } else {
            this.game.menuActive = false
        }

    }
}