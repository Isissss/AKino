import * as PIXI from 'pixi.js'
import { Shark } from "./Shark"
import sharkImage from "./images/shark.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import smokeImage from "./images/smog.png"
import fishImage from "./images/fish.png"
import { Smog } from './smog'
import { Graphics } from 'pixi.js'
import { Spawn } from './Spawn'

export class Game {
    pixi: PIXI.Application
    loader: PIXI.Loader
    shark: Shark
    smog: Smog
    graphics: Graphics
    spawner: Spawn

    constructor() {
        this.pixi = new PIXI.Application({ width: 800, height: 450, backgroundColor: 0xAAAAA })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader.add('sharkTexture', sharkImage)
            .add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)
        this.loader.load(() => this.loadCompleted())
    }

    loadCompleted() {
        this.shark = new Shark(this.loader.resources["sharkTexture"].texture!)
        this.smog = new Smog(this.pixi.screen.width / 2, this.pixi.screen.height / 2, 100)
        this.spawner = new Spawn(100, 100, 1000, this.loader.resources["fishTexture"].texture!, this)
        this.pixi.stage.addChild(this.smog)
        this.pixi.stage.addChild(this.spawner)
        this.pixi.stage.addChild(this.shark)
        this.pixi.ticker.add((delta) => this.update())

    }
    update() {
        this.spawner.update()
        this.shark.update()
        this.smog.update()

    }
    public spawnObject(sprite: PIXI.Sprite) {
        this.pixi.stage.addChild(sprite)
    }
}

let g = new Game

