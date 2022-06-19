import * as PIXI from 'pixi.js'
import Matter from 'matter-js'
import { Game } from './game'
export class Building extends PIXI.Sprite {
    rigidBody: Matter.Body
    game: Game


    constructor(texture: PIXI.Texture, x: number, y: number, game: Game) {
        super(texture)
        this.x = x
        this.y = y
        this.anchor.set(0.5);

        //Static element of game, for buildings so players cannot pass through
        this.rigidBody = Matter.Bodies.rectangle(x, y, this.width, this.height, { isStatic: true, label: "Platform" }) //x,y,w,h
        Matter.Composite.add(game.engine.world, this.rigidBody)
        console.log(this.rigidBody)
    }


}
