import * as PIXI from 'pixi.js'
 

export class Object extends PIXI.Sprite{

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = 10;
        this.y = 400;
        this.anchor.set(0.5);
}

}
