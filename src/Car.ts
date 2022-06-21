import * as PIXI from 'pixi.js'
import { Filter, Graphics } from 'pixi.js'

export class Car extends PIXI.Sprite {
  private direction: number
  // 1 is right
  // 2 is down
  // 3 is left
  // 4 is up
  private startx: number
  private starty: number
  private speed: number
  private filter: PIXI.Filter
  

  constructor(texture: PIXI.Texture, direction: number, startx: number, starty: number) {
    super(texture)
    this.x = startx
    this.direction = direction
    this.y = starty
    this.startx = startx
    this.starty = starty
    this.anchor.set(0.5)
    this.scale.set(0.2)
    this.speed = 1.5
    this.filter = new PIXI.filters.ColorMatrixFilter()
    this.getfilter()
  }

  private getfilter() {
    this.filters = [this.filter]
    this.filter.hue(Math.random() * 360, false) // HUE filter
  }

  public update(delta: number) {
    // If car turns left, turning points
    if (this.direction == 1) {
      if (this.x > 1960) {
        this.angle = 0
        this.y += this.speed

      } else {
        this.angle = -90
        this.x += this.speed
      }
      //If car reaches end of screen, set back to start loc
      if (this.y > 1450) {
        this.x = this.startx
        this.y = this.starty
        this.angle = 0
        this.getfilter()
      }
    }
    if (this.direction == 2) {
      // after turn direction
      if (this.y > 750) {
        this.angle = 90
        this.x -= this.speed

      } // original direction
       else {
        this.angle = 0
        this.y += this.speed
      }
      //If car reaches end of screen, set back to start loc
      if (this.x < -1000) {
        this.x = this.startx
        this.y = this.starty
        this.angle = 90
        this.getfilter()
      }
    }
    if (this.direction == 3) {
      if (this.x < -50) {
        this.angle = 180
        this.y -= this.speed

      } else {
        this.angle = 90
        this.x -= this.speed
      }
      //If car reaches end of screen, set back to start loc
      if (this.y < -500) {
        this.x = this.startx
        this.y = this.starty
        this.angle = 180
        this.getfilter()
      }
    }
    if (this.direction == 4) {
      if (this.y < 60) {
        this.angle = -90
        this.x += this.speed

      } else {
        this.angle = 180
        this.y -= this.speed
      }
      //If car reaches end of screen, set back to start loc
      if (this.x > 2900) {
        this.x = this.startx
        this.y = this.starty
        this.angle = -90
        this.getfilter()
      }
    }
  }
}

