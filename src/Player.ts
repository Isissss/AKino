import * as PIXI from "pixi.js"
import { Game } from "./game"

export class Player extends PIXI.Sprite {
  xspeed = 0
  yspeed = 0
  private game: Game
  public health: number
  public hit: boolean
  private counter: number = 0;

  constructor(texture: PIXI.Texture, mygame: Game) {
    super(texture)
    this.x = 150
    this.y = 150
    this.game = mygame
    this.hit = false
    this.health = 3
    this.scale.set(0.25)
    this.anchor.set(0.15)


    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
    window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
  }

  update(delta: number) {
    this.x += this.xspeed
    this.y += this.yspeed
    this.counter += delta;

    if (this.counter > 125 && this.hit == true) {
      this.hit = false
    }

  }
  public hitcar() {
    this.counter = 0
    this.hit = true
    this.game.score++;
    this.game.basicText.text = `Score ${this.game.score}`
  }

  jump() {
    console.log("jump!")
  }

  onKeyDown(e: KeyboardEvent): void {
    switch (e.key.toUpperCase()) {
      case " ":
        this.jump()
        break;
      case "A":
      case "ARROWLEFT":
        this.xspeed = -4
        this.scale.set(0.25)


        break
      case "D":
      case "ARROWRIGHT":
        this.xspeed = 4
        this.scale.set(-0.25, 0.25)

        break
      case "W":
      case "ARROWUP":
        this.yspeed = -4

        break
      case "S":
      case "ARROWDOWN":
        this.yspeed = 4

        break
    }
  }

  onKeyUp(e: KeyboardEvent): void {
    switch (e.key.toUpperCase()) {
      case " ":
        break;
      case "A":
      case "D":
      case "ARROWLEFT":
      case "ARROWRIGHT":
        this.xspeed = 0

        break
      case "W":
      case "S":
      case "ARROWUP":
      case "ARROWDOWN":
        this.yspeed = 0
        break
    }
  }
}