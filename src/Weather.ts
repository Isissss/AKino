import * as PIXI from "pixi.js"
import { Shark } from "./Shark"
import { Game } from "./game"

export class Weather {
    private player : Shark
    private timer = 0
    private delay : number
    private game : Game
    constructor(player : Shark, delay : number, game : Game){
        this.player = player
        this.delay = delay
        this.game = game
        this.timer = delay
    }

    update() {
        this.timer += 1
        if (this.timer > this.delay) {
            this.timer = 0
            let direction = Math.floor(Math.random() * 8)
            switch (direction) {
                case 0:
                    this.player.xweather = 2
                    this.player.yweather = 0
                    break
                case 1:
                    this.player.xweather = 0
                    this.player.yweather = 2
                    break
                case 2:
                    this.player.xweather = -2
                    this.player.yweather = 0
                    break
                case 3:
                    this.player.xweather = 0
                    this.player.yweather = -2
                    break
                case 4:
                    this.player.xweather = 1,414213562373095
                    this.player.yweather = 1,414213562373095
                    break
                case 5:
                    this.player.xweather = -1,414213562373095
                    this.player.yweather = 1,414213562373095
                    break
                case 6:
                    this.player.xweather = 1,414213562373095
                    this.player.yweather = -1,414213562373095
                    break
                case 7:
                    this.player.xweather = -1,414213562373095
                    this.player.yweather = -1,414213562373095
                    break
            }
            this.game.updateWeather(this.player.xweather, this.player.yweather)

        }

    }
}