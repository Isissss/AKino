import * as PIXI from 'pixi.js'
//import { Sprite, Texture } from 'pixi.js'
import { Game } from './game'
import { Object } from './Object'

export class Spawn extends PIXI.Sprite {
    private timer = 0
    private delay: number
    private objectTextures: PIXI.Texture[]
    private game: Game
    constructor(x: number, y: number, delay: number, textures: PIXI.Texture[] = [], game: Game) {
        super()
        this.game = game
        this.x = x
        this.y = y
        this.delay = delay
        this.objectTextures = textures
    }


    update() {
        this.timer += 1
        if (this.timer > this.delay) {
            let i = Math.round(Math.random())
            let sprite = new Object(this.objectTextures[i], this.game)
            sprite.scale.set(7)
            this.timer = 0
            this.game.spawnObject(sprite)
        }
    }
}