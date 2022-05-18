import * as PIXI from 'pixi.js'
import { Shark } from "./Shark"
import fishImage from "./images/shark.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"

class Game {
    pixi: PIXI.Application
    loader: PIXI.Loader

    constructor() {
        this.pixi = new PIXI.Application({ width: 800, height: 450, backgroundColor: 0xAAAAA })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader.add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)
        this.loader.load(() => this.loadCompleted())
    }

    loadCompleted() {
        let fish = new Shark(this.loader.resources["fishTexture"].texture!)
        this.pixi.stage.addChild(fish)
    }
}
new Game