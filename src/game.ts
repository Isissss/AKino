import * as PIXI from 'pixi.js'
import sharkImage from "./images/dino.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import cityImage from "./images/city.png"
import fishImage from "./images/fish.png"
import carImage from "./images/car.png"
import purpleImage from "./images/purple.png"
import greenImage from "./images/green.jpg"
import pinkImage from "./images/pink.jpg"
import { Graphics } from 'pixi.js'
import { Player } from './Player'
import { Color } from './Color'


export class Game {
    pixi: PIXI.Application
    loader: PIXI.Loader
    player: Player
    graphics: Graphics
    score: number = 0
    gameover: boolean
    color1: Color
    color2: Color
    color3: Color
    basicText: PIXI.Text;
    textStyle: PIXI.TextStyle;

    constructor() {
        this.pixi = new PIXI.Application({ width: window.innerWidth - 20, height: window.innerHeight - 20, backgroundColor: 0xBBBBB })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader.add('sharkTexture', sharkImage)
            .add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('cityTexture', cityImage)
            .add('carTexture', carImage)
            .add('purpleTexture', purpleImage)
            .add('pinkTexture', pinkImage)
            .add('greenTexture', greenImage)
        this.loader.load(() => this.loadCompleted())

    }

    loadCompleted() {
        this.player = new Player(this, this.loader.resources["sharkTexture"].texture!)
        this.pixi.stage.addChild(this.player)

        this.color = new Color(this.loader.resources["purpleTexture"].texture!, 100, 100, 200, this.player)
        this.color2 = new Color(this.loader.resources["pinkTexture"].texture!, 200, 100, 600, this.player)
        this.color3 = new Color(this.loader.resources["greenTexture"].texture!, 300, 100, 0, this.player)


        this.pixi.stage.addChild(this.color)
        this.pixi.stage.addChild(this.color2)
        this.pixi.stage.addChild(this.color3)

        this.pixi.ticker.add((delta) => this.update(delta))

        this.textStyle = new PIXI.TextStyle({
            fontSize: 31,
            fontWeight: "bold",
            trim: false
        });

        this.basicText = new PIXI.Text(`Levens ${this.player.health}`, this.textStyle);
        this.pixi.stage.addChild(this.basicText)

    }
    update(delta: number) {
        this.player.update(delta)
    }
}
let g = new Game