import Matter from 'matter-js'
import {Game} from "./game"
import * as PIXI from "pixi.js"


export class Player extends PIXI.Sprite {
    private rigidBody: Matter.Body
    private xspeed = 0
    private yspeed = 0
    public xweather = 0
    public yweather = 0
    private counter: number
    public hit: boolean = false
    public health: number = 3
    private game: Game


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

    public update(delta: number) {
        // Translate character based on speed
        Matter.Body.translate(this.rigidBody, {x: this.xspeed, y: this.yspeed})
        this.x = this.rigidBody.position.x + this.xweather
        this.y = this.rigidBody.position.y + this.yweather

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
        if (this.counter > 125 && this.hit) {
            this.hit = false
            if (this.health < 1) {
                this.game.endGame()
            }
        }
    }

    // Set counter to 0 for cooldown,
    public hitcar() {
        this.counter = 0
        this.hit = true
        this.health--;
    }


    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()
            ) {
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
            case"ARROWUP":
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