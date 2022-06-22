import Matter from 'matter-js'
import { Game } from "./game"
import { Joystick } from './arcade/joystick'
import * as PIXI from "pixi.js"


export class Player extends PIXI.AnimatedSprite {
  private rigidBody: Matter.Body
  private xspeed = 0
  private yspeed = 0
  public xweather = 0
  public yweather = 0
  private counter: number = 0
  public hit: boolean = false
  public health: number = 3
  private game: Game
  private joystick: Joystick


  constructor(animation: PIXI.Texture[], joystick: Joystick ,game: Game) {
    super(animation)
    this.animationSpeed = 0.1;
    this.joystick = joystick
    this.x = 100
    this.y = 100
    this.game = game
    this.scale.set(0.7);
    this.anchor.set(0.5)

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

  borderCheckx(xspeed: number){
    if (this.x + xspeed > (this.game.pixi.view.width / 2) * 3) {
      return 0
    } else if (this.x + xspeed < -(this.game.pixi.view.width / 2)) {
      return 0
    } else {
    return this.xspeed + this.xweather
    }
  }
  borderChecky(yspeed: number){
    if (this.y + yspeed > (this.game.pixi.view.height / 2) * 3) {
      return 0
    } else if (this.y + yspeed < -(this.game.pixi.view.height / 2)) {
      return 0
    } else {
    return this.yspeed + this.yweather
    }
  }

  public update(delta: number) {
    super.update(delta)

    if (this.joystick) {
      if (this.joystick.Left) {
        console.log("Left");
        this.scale.set(-0.7, 0.7)
        this.xspeed = -4
      } 
      else if (this.joystick.Right) {
        this.xspeed = 4
        this.scale.set(0.7)
      } else {
        this.xspeed = 0
      }
      if (this.joystick.Up) {
        this.yspeed = -4
      } 
      else if (this.joystick.Down) {
        this.yspeed = 4
      } else {
        this.yspeed = 0
      }
  }

    if (this.xspeed != 0 || this.yspeed != 0) {
      this.play()
    } else {
      this.stop()
    }
    // Translate character based on speed
    Matter.Body.translate(this.rigidBody, { x: this.borderCheckx(this.xspeed + this.xweather), y: this.borderChecky(this.yspeed + this.yweather) })
    this.x = this.rigidBody.position.x
    this.y = this.rigidBody.position.y
    this.counter += delta;

    // If player hits car (1.25s cooldown), set to false again so hit can occur again
    if (this.counter > 125 && this.hit) {
      this.hit = false
    }
  }

  // Set counter to 0 for cooldown,
  public hitcar() {
    this.counter = 0
    this.hit = true
    this.health--;
    if (this.health < 1) {
      this.game.endGame(3)
    }
  }


  

  onKeyDown(e: KeyboardEvent): void {
    switch (e.key.toUpperCase()
    ) {
      case "A":
      case "ARROWLEFT":
        this.xspeed = -4
        this.scale.set(-0.7, 0.7)


        break
      case "D":
      case "ARROWRIGHT":
        this.xspeed = 4
        this.scale.set(0.7)


        break
      case "W":
      case "ARROWUP":
        this.yspeed = -4

        break
      case "S":
      case "ARROWDOWN":

        this.yspeed = 4
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