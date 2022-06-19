import * as PIXI from "pixi.js"
import { Game } from "./game"



export class Button extends PIXI.Container {
    // traits
    game: Game
    sprites: PIXI.Sprite[] = []

    //behaviours
    constructor(game: Game, textures: PIXI.Texture[], x: number = 0, y: number = 0) {
        super()
        let i = 0;
        for(let texture of textures){
            let sprite = new PIXI.Sprite(texture);
            sprite.x = sprite.width*i;
            this.addChild(sprite)
            this.sprites.push(sprite)
            i++
        }      
        this.x = x
        this.y = y
        this.interactive = true
        this.buttonMode = true
        this.game = game
        //console.log("Button Added")
        this.on('pointerdown', () => this.buttonClicked())

    }

    public buttonClicked() {
        //console.log("Button Clicked")
        this.game.togglePauseMenu()
    }
}