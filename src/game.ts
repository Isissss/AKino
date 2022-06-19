import * as PIXI from 'pixi.js'
import { Player } from "./Player"
import sharkImage from "./images/dino.png"
import bubbleImage from "./images/building.png"
import waterImage from "./images/water.jpg"
import smokeImage from "./images/building.png"
import fishImage from "./images/fish.png"
import { Smog } from './Smog'
import { Graphics } from 'pixi.js'
import { Spawn } from './Spawn'
import { Building } from './Building'
import Matter from 'matter-js'

export class Game {
    pixi: PIXI.Application
    loader: PIXI.Loader
    shark: Player
    engine: Matter.Engine
    graphics: Graphics
    building: Building


    constructor() {
        this.pixi = new PIXI.Application({ width: window.innerWidth - 5, height: window.innerHeight - 5, backgroundColor: 0xAAAAA })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader.add('sharkTexture', sharkImage)
            .add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)
        this.loader.load(() => this.loadCompleted())

        this.engine = Matter.Engine.create()

    }

    loadCompleted() {
        this.shark = new Player(this.loader.resources["sharkTexture"].texture!, this)
        this.pixi.stage.addChild(this.shark)

        this.building = new Building(this.loader.resources["bubbleTexture"].texture!, this.loader.resources["bubbleTexture"].texture!, this.loader.resources["bubbleTexture"].texture!, 300, 500, this)
        this.pixi.stage.addChild(this.building)
        this.pixi.ticker.add(() => this.update(1000 / 60))

        this.engine.gravity.y = 0
    }
    update(delta: number) {
        Matter.Engine.update(this.engine, 1000 / 60)
        this.shark.update(delta)

    }
}

let g = new Game

