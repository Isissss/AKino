import * as PIXI from "pixi.js"
import { Game } from "./game"

export class Player extends PIXI.Sprite {
  xspeed = 0
  yspeed = 0
  public xweather = 0
  public yweather = 0
  counter: number
  hit: boolean = false
  health: number = 3
  game: Game

  constructor(game: Game, texture: PIXI.Texture) {
    super(texture)
    this.x = 100
    this.y = 100
    this.game = game
    // buggy thing
    this.game = game

    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
    window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
  }

  update(delta: number) {
    this.x += this.xspeed + this.xweather
    this.y += this.yspeed + this.yweather
    if (this.x > window.innerWidth) {
      this.x = window.innerWidth
    }
    if (this.x < 0) {
      this.x = 0
    }
    if (this.y > window.innerHeight) {
      this.y = window.innerHeight
    }
    if (this.y < 0) {
      this.y = 0
    }
    this.counter += delta;

    // If player hits car (1.25s cooldown), set to false again so hit can occur again
    if (this.counter > 125 && this.hit == true) {
      this.hit = false
    }

    if (this.health < 1) {
      this.game.endGame(3)
    }
  }
  // Set counter to 0 for cooldown,
  public hitcar() {
    this.counter = 0
    this.hit = true
    this.health--;
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