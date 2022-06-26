import * as PIXI from 'pixi.js'
import Matter from 'matter-js'
import { Game } from './game'

export class Building extends PIXI.Sprite {
    private rigidBody: Matter.Body
    private texture1: PIXI.Texture
    private texture2: PIXI.Texture
    private texture3: PIXI.Texture

    constructor(x: number, y: number, texture1: PIXI.Texture, texture2: PIXI.Texture, texture3: PIXI.Texture, game: Game) {
        super(texture1)
        this.x = x
        this.y = y
        this.anchor.set(0.5);

        //Static element of game, for buildings so players cannot pass through
        this.rigidBody = Matter.Bodies.rectangle(x, y, this.width + 5, this.height + 5, { isStatic: true, label: "Platform" }) //x,y,w,h
        Matter.Composite.add(game.engine.world, this.rigidBody)

        this.texture1 = texture1
        this.texture2 = texture2
        this.texture3 = texture3
    }

    public update(score: number) {
        if (score <= 10) {
            this.texture = this.texture1
        }
        else if (score <= 25) {
            this.texture = this.texture2
        }
        else {
            this.texture = this.texture3
        }
    }
}
