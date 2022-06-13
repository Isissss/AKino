import * as PIXI from 'pixi.js'
import { Filter, Graphics } from 'pixi.js'

export class Car extends PIXI.Sprite {
  private left: boolean
  private startx: number
  private starty: number
  private speed: number
  private filter: PIXI.Filter

  constructor(texture: PIXI.Texture, left: boolean, startx: number, starty: number) {
    super(texture)
    this.x = startx
    this.left = left
    this.y = starty
    this.startx = startx
    this.starty = starty
    this.anchor.set(0.5)
    this.scale.set(0.2)
    this.speed = 1.5
    this.angle = (this.left ? 360 : 90)
    this.filter = new PIXI.filters.ColorMatrixFilter()
    this.getfilter()
  }

  private getfilter() {
    this.filters = [this.filter]
    this.filter.hue(Math.random() * 360, false) // HUE filter
  }

  public update(delta: number) {
    // If car turns left, turning points
    if (this.left) {
      if (this.y > 620) {
        this.angle = 90
        this.x -= this.speed

      } else {
        this.y += this.speed
      }
      //If car reaches end of screen, set back to start loc
      if (this.x < -50) {
        this.x = this.startx
        this.y = this.starty
        this.angle = 360
        this.getfilter()
      }
    } else {
      //console.log(this.x)
      if (this.x < 800) {
        this.angle = 180
        this.y -= this.speed

      } else {
        this.x -= this.speed
      }
      //If car reaches top of screen, set back to start loc
      if (this.y < -50) {
        this.x = 1400
        this.y = this.starty
        this.getfilter()
        this.angle = 90
      }
    }
  }
}

