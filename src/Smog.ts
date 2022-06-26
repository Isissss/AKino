import * as PIXI from 'pixi.js'
import { Player } from './Player'


export class Smog extends PIXI.Graphics {

    private player: Player
    private radius: number
    private originalRadius: number


    constructor(player: Player, radius: number) {
        super()
        this.player = player
        this.originalRadius = radius
        this.radius = this.originalRadius
        this.draw()
    }

    private draw() {
        this.beginFill(0xffffff)
        this.alpha = 0.3
        this.drawCircle(this.player.x, this.player.y, this.radius)
        this.endFill
    }

    public reset() {
        this.radius = this.originalRadius
        this.clear()
        this.draw()
    }

    public update() {
        if (this.radius >= 1) {
            this.radius -= 1
            this.clear()
            this.draw()
        }
        else {
            this.reset()
        }
    }
}
