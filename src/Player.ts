import * as PIXI from 'pixi.js'


export class Player extends PIXI.Sprite {
    public speed: number

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = 790;
        this.y = 400;
        this.speed = 4;
        this.anchor.set(0.5);


    }

    public update() {
        this.x -= this.speed
    }
}

