import * as PIXI from "pixi.js"
import { Player } from "./Player"
import { Game } from "./game"

export class Map {
    private game : Game
    private player : Player
    public borderHorizontal : number // needs getter/setter -> due to new way of menu spawning
    public borderVertical : number // needs getter/setter -> due to new way of menu spawning

    constructor(game : Game, player : Player){
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
            // Make the UI follow the camera
            this.game.ui.x = -(this.game.pixi.screen.width / 2) + this.borderHorizontal
            // Make the Menu follow the camera
            //this.game.pauseMenu.x = this.borderHorizontal -> now done in game.ts due to new way of menu spawning
        }
        // check if the player has crossed the left border
        if (this.player.x <= -(this.game.pixi.screen.width / 2) + this.borderHorizontal) {
            // set the camera a screen away from its original position
            this.game.pixi.stage.pivot.set(-(this.game.pixi.screen.width) + this.borderHorizontal, this.game.pixi.stage.pivot.y)
            // set the new border a full screen away
            this.borderHorizontal -= this.game.pixi.screen.width
            // Make the UI follow the camera
            this.game.ui.x = -(this.game.pixi.screen.width / 2) + this.borderHorizontal
            // Make the Menu follow the camera
            //this.game.pauseMenu.x = this.borderHorizontal -> now done in game.ts due to new way of menu spawning
        }
        // check if the player has crossed the top border
        if (this.player.y >= this.game.pixi.screen.height / 2 + this.borderVertical) {
            // set the camera a screen away from its original position
            this.game.pixi.stage.pivot.set(this.game.pixi.stage.pivot.x, this.game.pixi.screen.height + this.borderVertical)
            // set the new border a full screen away
            this.borderVertical += this.game.pixi.screen.height
            // Make the UI follow the camera
            this.game.ui.y = -(this.game.pixi.screen.height / 2) + this.borderVertical
            // Make the Menu follow the camera
            //this.game.pauseMenu.y = this.borderVertical -> now done in game.ts due to new way of menu spawning
        }
        // check if the player has crossed the bottom border
        if (this.player.y <= -(this.game.pixi.screen.height / 2) + this.borderVertical) {
            // set the camera a screen away from its original position
            this.game.pixi.stage.pivot.set(this.game.pixi.stage.pivot.x, -(this.game.pixi.screen.height) + this.borderVertical)
            // set the new border a full screen away
            this.borderVertical -= this.game.pixi.screen.height
            // Make the UI follow the camera
            this.game.ui.y = -(this.game.pixi.screen.height / 2) + this.borderVertical
            // Make the Menu follow the camera
            //this.game.pauseMenu.y = this.borderVertical -> now done in game.ts due to new way of menu spawning
        }
       
    }
}