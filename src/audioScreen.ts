import * as PIXI from 'pixi.js'


export class audioScreen extends PIXI.Sprite {
  private sound: HTMLAudioElement
  constructor(texture: PIXI.Texture, sound: HTMLAudioElement) {
    super(texture)
    this.interactive = true
    this.buttonMode = true
    this.x = 0
    this.y = 0
    this.sound = sound
    this.on("pointerdown", () => this.clicked())
  }


  clicked() {
    this.sound.play()
    this.destroy()
  }
}