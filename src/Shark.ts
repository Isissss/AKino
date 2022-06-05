import * as PIXI from "pixi.js"

export class Shark extends PIXI.Sprite {
  xspeed = 0
  yspeed = 0
  health = 3 // added for UI testing


  constructor(texture: PIXI.Texture) {
    super(texture)
    this.x = 100
    this.y = 100
    this.scale.set(0.3);
    this.anchor.set(0.5,0.5)


    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
    window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
  }

  update() {
    this.x += this.xspeed
    this.y += this.yspeed
    //console.log(this.x)
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