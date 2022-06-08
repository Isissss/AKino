import * as PIXI from "pixi.js"

export class Player extends PIXI.Sprite {
  private xspeed = 0
  private yspeed = 0

  constructor(texture: PIXI.Texture) {
    super(texture)
    this.x = 100
    this.y = 100


    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
    window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
  }

  public update() {
    this.x += this.xspeed
    this.y += this.yspeed
    console.log(this.x)
  }

  private jump() {
    console.log("jump!")
  }

  private onKeyDown(e: KeyboardEvent): void {
    switch (e.key.toUpperCase()) {
      case " ":
        this.jump()
        break;
      case "A":
      case "ARROWLEFT":
        this.xspeed = -7
        console.log("a")

        break
      case "D":
      case "ARROWRIGHT":
        this.xspeed = 7
        console.log("d")
        break
      case "W":
      case "ARROWUP":
        this.yspeed = -7
        console.log("w")
        break
      case "S":
      case "ARROWDOWN":
        this.yspeed = 7
        console.log("s")
        break
    }
  }

  private onKeyUp(e: KeyboardEvent): void {
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