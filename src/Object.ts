import * as PIXI from 'pixi.js'
 

export class Object extends PIXI.Sprite{
    public speed: number 
    constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = (Math.random() * window.innerWidth) - 5
        this.y = (Math.random() * window.innerHeight) - 5
        this.speed = 4;
        this.anchor.set(0.5);
}

    public update() {
        this.x += this.speed
    }
}