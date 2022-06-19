import * as PIXI from "pixi.js"
import Matter from 'matter-js'
import { Game } from "./game"

export class Player extends PIXI.Sprite {
  rigidBody: Matter.Body
  xspeed = 0
  yspeed = 0
  public xweather = 0
  public yweather = 0
  counter: number
  hit: boolean = false
  health: number = 3
  game: Game

  constructor(texture: PIXI.Texture, game: Game) {
    super(texture)
    this.x = 100
    this.y = 100
    this.game = game
    this.scale.set(0.25);
    this.anchor.set(0.5, 0.5)

    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
    window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

    const playerOptions: Matter.IBodyDefinition = {
      density: 0.001,
      friction: 0.7,
      frictionStatic: 0,
      frictionAir: 0.01,
      restitution: 0.5,
      inertia: Infinity,
      inverseInertia: Infinity,
      label: "Player"
    }

    this.rigidBody = Matter.Bodies.rectangle(this.x, this.y, this.width, this.height, playerOptions)
    Matter.Composite.add(game.engine.world, this.rigidBody)

  }

  public update() {
    // Translate character based on speed
    Matter.Body.translate(this.rigidBody, { x: this.xspeed, y: this.yspeed })
    this.x = this.rigidBody.position.x
    this.y = this.rigidBody.position.y

  }

  onKeyDown(e: KeyboardEvent): void {
    switch (e.key.toUpperCase()) {
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