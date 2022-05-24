import * as PIXI from 'pixi.js'
import { Shark } from "./Shark"
import sharkImage from "./images/shark.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import smokeImage from "./images/smog.png"
import { Smog } from './smog'
import { Graphics } from 'pixi.js'

class Game {
    pixi: PIXI.Application
    loader: PIXI.Loader
    shark: Shark
    smog: Smog
    graphics: Graphics

    constructor() {
        this.pixi = new PIXI.Application({ width: 800, height: 450, backgroundColor: 0xAAAAA })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader.add('sharkTexture', sharkImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)
        this.loader.load(() => this.loadCompleted())
    }

    loadCompleted() {
        this.shark = new Shark(this.loader.resources["sharkTexture"].texture!)
        this.pixi.stage.addChild(this.shark)
        this.smog = new Smog(this.pixi.screen.width / 2, this.pixi.screen.height / 2, 100)
        this.pixi.stage.addChild(this.smog)
        this.pixi.ticker.add((delta) => this.update())

    }
    update() {
        this.shark.update()
        this.smog.update()

    }
}

let g = new Game
