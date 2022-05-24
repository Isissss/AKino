import * as PIXI from 'pixi.js'
import { Sprite, Texture } from 'pixi.js'
import { Game } from './game'

export class Spawn extends PIXI.Sprite{
    private timer = 0
    private delay : number
    private objectTexture : PIXI.Texture
    private game : Game 
    constructor(x : number, y : number, delay : number, texture : PIXI.Texture, game : Game) {
        super()
        this.game = game
        this.x = x
        this.y = y
        this.delay = delay
        this.objectTexture = texture
    }


    update() {
        this.timer += 1
        console.log(this.timer)
        if (this.timer > this.delay) {
            let sprite = new Sprite(this.objectTexture)
            sprite.x = this.x
            sprite.y = this.y
            this.timer = 0
            this.game.spawnObject(sprite)
            console.log("hello")
        }
    }
}