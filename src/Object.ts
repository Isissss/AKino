import * as PIXI from 'pixi.js'
import { Game } from './game'

export class Object extends PIXI.Sprite {
    public speed: number
    game: Game
    pickupSound: HTMLAudioElement
    constructor(texture: PIXI.Texture, game: Game) {
        super(texture)
        this.game = game
        this.x = (Math.random() * window.innerWidth) - 5
        this.y = (Math.random() * window.innerHeight) - 5
        this.speed = 4;
        this.anchor.set(0.5);

        this.pickupSound = this.game.loader.resources["pickupsoundFile"].data!
    }

    public update() {
        this.x += this.speed
    }

    public pickedUp() {
        this.pickupSound.pause()
        this.pickupSound.play()
        console.log("Pakt op")
    }
}