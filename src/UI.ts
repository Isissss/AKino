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
        // need access to the game, to display correct values
        this.game = game
        //container's own x and y position
        this.x = -(this.game.pixi.screen.width / 2)
        this.y = -(this.game.pixi.screen.height / 2)
        // add a pausebutton
        this.pauseButton = new Button(this.game,[pauseButtonTexture], 0, 0)
        this.pauseButton.scale.set(3)
        this.healthDisplay = new HPDisplay(this.game, heartTexture, window.innerWidth, 0)
        

        // add all elements to the displayObject container
        this.addChild(this.pauseButton, this.healthDisplay)

    }
}