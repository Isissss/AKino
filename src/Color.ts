import * as PIXI from "pixi.js"
import { Player } from "./Player"

export class Color extends PIXI.Sprite {
    private player: Player
    private color: Number

    constructor(texture: PIXI.Texture, x: number, y: number, tint: number, player: Player) {
        super(texture)
        this.x = x
        this.y = y
        this.player = player
        this.width = 50
        this.height = 50
        this.interactive = true  // make clickable
        this.buttonMode = true   // show hand cursor
        this.on('pointerdown', () => this.onClick())
        this.color = tint
    }

    onClick() {
        this.player.setFilter(this.color)
    }
}
