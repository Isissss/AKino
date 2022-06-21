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
import { AssetLoader } from "./AssetLoader"


export class Game {
    public pixi: PIXI.Application
    public loader: PIXI.Loader
    private player: Player
    private dinoTextures: PIXI.Texture[] = [];
    private graphics: Graphics
    public score: number = 0
    public gameover: boolean
    private color1: Color
    private color2: Color
    private color3: Color
    private assetLoader: AssetLoader
    public basicText: PIXI.Text;
    public textStyle: PIXI.TextStyle;
    constructor() {


        this.pixi = new PIXI.Application({ width: window.innerWidth - 20, height: window.innerHeight - 20, backgroundColor: 0xBBBBB })
        document.body.appendChild(this.pixi.view)

        this.assetLoader = new AssetLoader(this)

    }
    createDinoFrames() {

        for (let i = 1; i < 6; i++) {
            const texture = PIXI.Texture.from(`dino_${i}.png`);
            this.dinoTextures.push(texture);
            console.log(this.dinoTextures)
        }
    }
    loadCompleted() {
        this.createDinoFrames()
        this.player = new Player(this, this.dinoTextures)
        this.pixi.stage.addChild(this.player)
        this.color = new Color(this.assetLoader.resources["purpleTexture"].texture!, 100, 100, 200, this.player)

        this.color2 = new Color(this.assetLoader.resources["pinkTexture"].texture!, 200, 100, 600, this.player)
        this.color3 = new Color(this.assetLoader.resources["greenTexture"].texture!, 300, 100, 0, this.player)


        this.pixi.stage.addChild(this.color)
        this.pixi.stage.addChild(this.color2)
        this.pixi.stage.addChild(this.color3)

        this.pixi.ticker.add((delta) => this.update(delta))

        // this.textStyle = new PIXI.TextStyle({
        //     fontSize: 31,
        //     fontWeight: "bold",
        //     trim: false
        // });

        // this.basicText = new PIXI.Text(`Levens ${this.player.health}`, this.textStyle);
        // this.pixi.stage.addChild(this.basicText)

    }
    update(delta: number) {
        this.player.update(delta)
    }
}
let g = new Game