import * as PIXI from 'pixi.js'
import { Shark } from "./Shark"
import sharkImage from "./images/shark.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"

class Game {
    pixi: PIXI.Application
    loader: PIXI.Loader

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
        let shark = new Shark(this.loader.resources["sharkTexture"].texture!)
        this.pixi.stage.addChild(shark)
        this.pixi.ticker.add((delta) => shark.update())
    }
}
new Game