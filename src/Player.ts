import * as PIXI from 'pixi.js'
 

export class Player extends PIXI.Sprite {

    constructor(texture: PIXI.Texture) {
        super(texture)
    this.x = 790;
    this.y = 400;
    this.anchor.set(0.5);


}
}
