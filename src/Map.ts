import * as PIXI from "pixi.js"
import { Shark } from "./Shark"
import { Game } from "./game"

export class Map {
    private game : Game
    private player : Shark
    private borderHorizontal : number
    private borderVertical : number

    constructor(game : Game, player : Shark){
        this.game = game
        this.player = player
        this.borderHorizontal = 0
        this.borderVertical = 0
    }

    update() {
        // check if the player has crossed the right border
        if (this.player.x >= this.game.pixi.screen.width / 2 + this.borderHorizontal) {
            // set the camera a screen away from its original position
            this.game.pixi.stage.pivot.set(this.game.pixi.screen.width + this.borderHorizontal, this.game.pixi.stage.pivot.y)
            // set the new border a full screen away
            this.borderHorizontal += this.game.pixi.screen.width
        }
        // check if the player has crossed the left border
        if (this.player.x <= -(this.game.pixi.screen.width / 2) + this.borderHorizontal) {
            // set the camera a screen away from its original position
            this.game.pixi.stage.pivot.set(-(this.game.pixi.screen.width) + this.borderHorizontal, this.game.pixi.stage.pivot.y)
            // set the new border a full screen away
            this.borderHorizontal -= this.game.pixi.screen.width
        }
        // check if the player has crossed the top border
        if (this.player.y >= this.game.pixi.screen.height / 2 + this.borderVertical) {
            // set the camera a screen away from its original position
            this.game.pixi.stage.pivot.set(this.game.pixi.stage.pivot.x, this.game.pixi.screen.height + this.borderVertical)
            // set the new border a full screen away
            this.borderVertical += this.game.pixi.screen.height
        }
        // check if the player has crossed the bottom border
        if (this.player.y <= -(this.game.pixi.screen.height / 2) + this.borderVertical) {
            // set the camera a screen away from its original position
            this.game.pixi.stage.pivot.set(this.game.pixi.stage.pivot.x, -(this.game.pixi.screen.height) + this.borderVertical)
            // set the new border a full screen away
            this.borderVertical -= this.game.pixi.screen.height
        }
       
    }
}