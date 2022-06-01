import * as PIXI from 'pixi.js'

export class Rightcar extends PIXI.Sprite {

    public speed: number 
 
    constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = 1200
        this.y = 625
        this.anchor.set(0.5)
        this.angle = 90
        this.scale.set(0.25)
        this.speed = 2
        const filter = new PIXI.filters.ColorMatrixFilter()
        this.filters = [filter]
        filter.hue(Math.random()*360, false) // HUE filter

        // let test = Math.round(Math.random()); 
        // if (test == 0) {
        //   this.left = true
        // }
      }
 
      public update() {
    //   console.log(this.y)
    
    if (this.x == 800) {
      this.angle = 180
      this.y -= this.speed
      
    } else { 
      this.x -= this.speed
    }

    if (this.y < -50) {
        this.x = 1200
        this.y = 625
    //   this.y = 40
      this.angle = 90
    }
  }
}