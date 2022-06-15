import * as PIXI from 'pixi.js'
import { Game } from './game'
import { Filter, Graphics } from 'pixi.js'

export class Car extends PIXI.Sprite {
  private left: boolean
  private startx: number
  private starty: number
  private speed: number
  public game: Game
  private filter: PIXI.Filter

  constructor(texture: PIXI.Texture, left: boolean, startx: number, starty: number, game: Game) {
    super(texture)
    this.x = startx
    this.left = left
    this.y = starty
    this.startx = startx
    this.starty = starty
    this.anchor.set(0.5)
    this.scale.set(0.2)
    this.speed = 1.5
    this.game = game
    this.angle = (this.left ? 360 : 90)
    this.filter = new PIXI.filters.ColorMatrixFilter()
    this.getfilter()

  }

  private getfilter() {
    this.filters = [this.filter]
    this.filter.hue(Math.random() * 360, false) // HUE filter
  }

  private resetPosition() {
    this.x = this.startx
    this.y = this.starty
    this.angle = (this.left ? 360 : 90)
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
      if (this.x < this.game.pixi.screen.left - 50) {
        this.resetPosition()
        this.getfilter()
      }
    } else {

      //Turning points other cars
      if (this.x < 800) {
        this.angle = 180
        this.y -= this.speed
      } else {
        this.x -= this.speed
      }

      //If car reaches top of screen, set back to start loc
      if (this.y < this.game.pixi.screen.top - 50) {
        this.resetPosition()
        this.getfilter()
      }
    }
  }
}

