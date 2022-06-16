import * as PIXI from "pixi.js"
import { Texture } from "pixi.js"



export class Leaf extends PIXI.Sprite{
    public xweather = 0
    public yweather = 0
    private speed : number
    private rotationSpeed : number
    constructor(texture : Texture){
        super(texture)
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
        this.speed = Math.random() * 4
        this.rotationSpeed = Math.random() * 0.1
        if (this.speed <= 0.3) {
            this.speed = 1
        }
    }

    update() {
        this.x += this.xweather * this.speed
        this.y += this.yweather * this.speed
        this.rotation += this.rotationSpeed
        if (this.x > window.innerWidth) {
            this.x = 0
          }
          if (this.x < 0) {
            this.x = window.innerWidth
          }
          if (this.y > window.innerHeight) {
            this.y = 0
          }
          if (this.y < 0) {
            this.y = window.innerHeight
          }
    }

    public changeWeather(x : number, y : number) {
        this.xweather = x
        this.yweather = y
    }
}