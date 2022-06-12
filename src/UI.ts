import * as PIXI from "pixi.js"
import { Button } from './Button'
import { Game } from "./game"
import { HPDisplay } from "./HPDisplay"

// class to hold all UI elements that appear on screen.
export class UI extends PIXI.Container {    
    // traits
    game: Game

    pauseButton: Button
    healthDisplay: HPDisplay
    healthBackground: PIXI.Sprite
    

    //behaviours
    constructor(game: Game, pauseButtonTexture: PIXI.Texture, heartTexture: PIXI.Texture, backgroundTexture: PIXI.Texture){
        super()
        //container's own x and y position
        this.x = 0
        this.y = 0
        // need access to the game, to display correct values
        this.game = game
        // debug
        console.log("UI Added")
        // add a pausebutton
        this.pauseButton = new Button(this.game, pauseButtonTexture, 0, 0)
        this.healthDisplay = new HPDisplay(this.game, heartTexture, window.innerWidth, 0)
        this.healthBackground = new PIXI.Sprite(backgroundTexture)
        this.healthBackground.anchor.set(1,0)
        this.healthBackground.x = window.innerWidth
        this.healthBackground.y = this.healthDisplay.y
        this.healthBackground.width = this.healthDisplay.width + 20
        this.healthBackground.height = this.healthDisplay.height + 10
        console.log(this.healthBackground)

        // add all elements to the displayObject container
        this.addChild(this.pauseButton,this.healthBackground, this.healthDisplay)

    }
}