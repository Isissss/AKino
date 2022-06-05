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
    

    //behaviours
    constructor(game: Game, pauseButtonTexture: PIXI.Texture, heartTexture: PIXI.Texture){
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

        // add all elements to the displayObject container
        this.addChild(this.pauseButton, this.healthDisplay)

    }
}