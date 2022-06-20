import * as PIXI from "pixi.js"
import { Game } from "./game"



export class HPDisplay extends PIXI.Container {
    // traits
    game: Game
    hearts: PIXI.Sprite[] = []
    fullTexture: PIXI.Texture

    //behaviours
    constructor(game: Game, fullTexture: PIXI.Texture, x: number = 0, y: number = 0) {
        super()
        this.fullTexture = fullTexture
        //console.log("HPDisplay added")
        this.game = game
        this.y = y
        for (let i = 0; i < this.game.player.health; i++) {
            this.addHeart(i, fullTexture)
        }
        this.x = x - (this.width + 10)
    }

    private addHeart(i: number, fullTexture: PIXI.Texture) {
        let heart = new PIXI.Sprite(fullTexture)
        heart.x = i * (heart.width + 3)
        heart.y = this.y
        heart.tint = 0xff0000
        this.addChild(heart)
        this.hearts.push(heart)
    }

    update() {
        // not able to check if this works yet, as health isnt being modified while game runs.
        if (this.game.player.health < this.hearts.length) {
            this.hearts[this.hearts.length - 1].destroy()
            this.hearts.pop()
        }
        else if (this.game.player.health > this.hearts.length) {
            this.addHeart(this.hearts.length - 1, this.fullTexture)
        } else if (this.hearts.length === 0) {
            console.log("GAME OVER")
            this.game.pixi.stop()
        }
    }
}
