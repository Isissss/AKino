import * as PIXI from "pixi.js"
import { Game } from "./game"

export class Player extends PIXI.Sprite {
    private xspeed = 0
    private yspeed = 0
    private counter: number
    private hit: boolean = false
    private health: number = 3
    private filter: PIXI.Filter


    constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = window.innerWidth / 2.5
        this.y = 100

        this.filter = new PIXI.filters.ColorMatrixFilter()
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }


    update(delta: number) {
        this.x += this.xspeed
        this.y += this.yspeed

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
            //this.game.endGame()
        }
    }
    // Set counter to 0 for cooldown,
    public hitcar() {
        this.counter = 0
        this.hit = true
        this.health--;
    }

    public setFilter(tint: number) {
        this.filters = [this.filter]
        this.filter.hue(tint) // HUE filter
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
                this.scale.set(1)


                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 4
                this.scale.set(-1, 1)

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