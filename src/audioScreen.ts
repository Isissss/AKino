import * as PIXI from 'pixi.js'


export class audioScreen extends PIXI.Sprite {
  private sound: HTMLAudioElement
  constructor(texture: PIXI.Texture, sound: HTMLAudioElement) {
    super(texture)
    this.interactive = true
    this.buttonMode = true
    this.x = window.innerWidth
    this.y = window.innerHeight
    this.sound = sound
    this.on("pointerdown", () => this.clicked())
  }


  clicked() {
    this.sound.play()
    this.destroy()
  }
}