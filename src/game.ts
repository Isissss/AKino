import * as PIXI from 'pixi.js'
import sharkImage from "./images/dino.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import smokeImage from "./images/smog.png"
import fishImage from "./images/fish.png"
import { Smog } from './Smog'
import { Graphics } from 'pixi.js'
import { Spawn } from './Spawn'
import { Object } from './Object'

export class Game {
    pixi: PIXI.Application
    loader: PIXI.Loader
    shark: Shark
    graphics: Graphics
    objects : Object[] = []
    score: number = 0
    car: Car
    basicText: PIXI.Text;
    textStyle: PIXI.TextStyle;

    constructor() {
        this.pixi = new PIXI.Application({ width: window.innerWidth - 5, height: window.innerHeight - 5, backgroundColor: 0xAAAAA })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader.add('sharkTexture', sharkImage)
            .add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)
            .add('cartexture', carImage)
        this.loader.load(() => this.loadCompleted())
    }

    loadCompleted() {
        this.shark = new Shark(this.loader.resources["sharkTexture"].texture!)
        this.car = new Car(this.loader.resources["carTexture"].texture!)
        this.pixi.stage.addChild(this.shark)
        this.pixi.stage.addChild(this.car)
        this.pixi.ticker.add((delta) => this.update())

        this.textStyle = new PIXI.TextStyle({
            fontSize: 31,
            fontWeight: "bold",
            trim: false
        });

        this.basicText = new PIXI.Text(`Score ${this.score}`, this.textStyle);
        this.basicText.x = 100
        this.basicText.y = 100

        this.pixi.stage.addChild(this.basicText)

    }
    update() {
        this.shark.update()
 
        }
 
 
}

let g = new Game

