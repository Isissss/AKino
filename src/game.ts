import * as PIXI from 'pixi.js'
import { Shark } from "./Shark"
import sharkImage from "./images/shark.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import { Map } from "./Map"
import { Sprite, TilingSprite } from 'pixi.js'

export class Game {
    pixi: PIXI.Application
    loader: PIXI.Loader
    shark : Shark
    map : Map

    constructor() {
        this.pixi = new PIXI.Application({ width: window.innerWidth - 5, height: window.innerHeight - 5, backgroundColor: 0xAAAAA })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader.add('sharkTexture', sharkImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)
        this.loader.load(() => this.loadCompleted())
    }

    loadCompleted() {
        let sprite = new TilingSprite(this.loader.resources["waterTexture"].texture!, this.pixi.screen.width, this.pixi.screen.height)
        this.shark = new Shark(this.loader.resources["sharkTexture"].texture!)
        this.map = new Map(this, this.shark)

        this.pixi.stage.addChild(sprite)
        this.pixi.stage.addChild(this.shark)

        this.pixi.stage.x = this.pixi.screen.width / 2;
        this.pixi.stage.y = this.pixi.screen.height / 2;

        this.pixi.ticker.add((delta) => this.update())
    }

    update() {
        this.shark.update()
        this.map.update()
    }
}
new Game