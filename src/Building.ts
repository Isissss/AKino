import * as PIXI from 'pixi.js'

export class Building extends PIXI.Sprite {
  private texture1: PIXI.Texture
  private texture2: PIXI.Texture
  private texture3: PIXI.Texture
  constructor(x: number, y: number, texture1: PIXI.Texture, texture2: PIXI.Texture, texture3: PIXI.Texture) {
    super(texture1)
    this.x = x
    this.y = y
    this.texture1 = texture1
    this.texture2 = texture2
    this.texture3 = texture3

  }

  update(score: number) {
    if (score <= 10) {
      this.texture = this.texture1
    }
    else if (score <= 20) {
      this.texture = this.texture2
    }
    else {
      this.texture = this.texture3
    }
  }

}