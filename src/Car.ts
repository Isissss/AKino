import * as PIXI from 'pixi.js'
import { Graphics } from 'pixi.js'

export class Car extends PIXI.Sprite {
  private left: boolean
  private startx: number
  private starty: number
  private speed: number

  constructor(texture: PIXI.Texture, left: boolean, startx: number, starty: number) {
    super(texture)
    this.x = startx
    this.left = left
    this.y = starty
    this.startx = startx
    this.starty = starty - 30
    this.anchor.set(0.5)
    this.scale.set(0.2)
    this.speed = 1.5
    this.angle = (this.left ? 360 : 90)

    const filter = new PIXI.filters.ColorMatrixFilter()
    this.filters = [filter]
    filter.hue(Math.random() * 360, false) // HUE filter

  }

  public update(delta: number) {
    if (this.left) {
      if (this.y > 620) {
        this.angle = 90
        this.x -= this.speed

      } else {
        this.y += this.speed
      }

      if (this.x < -50) {
        this.x = this.startx
        this.y = this.starty
        this.angle = 360
      }
    } else {
      console.log(this.x)
      if (this.x < 800) {
        this.angle = 180
        this.y -= this.speed

      } else {
        this.x -= this.speed
      }

      if (this.y < -50) {
        this.x = 1200
        this.y = 625

        this.angle = 90
      }
    }
  }
}

