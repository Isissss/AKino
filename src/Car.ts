import * as PIXI from 'pixi.js'
import { Graphics } from 'pixi.js'

export class Car extends PIXI.Sprite {
           hitbox:PIXI.Rectangle
    public speed: number 
    private left: boolean
    constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = 640
        this.y = 40
      this.anchor.set(0.5)
        this.angle = 360
      this.scale.set(0.2)
        this.speed = 2
        const filter = new PIXI.filters.ColorMatrixFilter()
        this.filters = [filter]
        filter.hue(Math.random()*360, false) // HUE filter
  
    }
      
 
      public update(delta : number) {
      
     
    if (this.y == 620) {
      this.angle = 90
      this.x -= this.speed
      
    } else { 
      this.y += this.speed
    }

    if (this.x < -50) {
      this.x = 640
      this.y = 20
      this.angle = 360
    }
    }


}