import * as PIXI from "pixi.js"
import { Game } from "./Game"

import sharkImage from "./images/dino.png"
import bubbleImage from "./images/bubble.png"

import cityImage from "./images/city.png"
import fishImage from "./images/fish.png"
import carImage from "./images/car.png"
import purpleImage from "./images/purple.png"
import greenImage from "./images/green.jpg"
import pinkImage from "./images/pink.jpg"

export class AssetLoader extends PIXI.Loader {

    graphics: PIXI.Graphics
    game: Game

    constructor(game: Game) {
        super()

        this.game = game
        this.graphics = new PIXI.Graphics()
        game.pixi.stage.addChild(this.graphics)

        this.add('sharkTexture', sharkImage)
            .add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('cityTexture', cityImage)
            .add('carTexture', carImage)
            .add('purpleTexture', purpleImage)
            .add('pinkTexture', pinkImage)
            .add('greenTexture', greenImage)
            .add("spritesheet", "dino.json")

        this.onProgress.add((loader) => this.showProgress(loader))
        this.onError.add((arg) => { console.error(arg) })
        this.load(() => {
            this.graphics.destroy()
            game.loadCompleted()
        })
    }

    private showProgress(loader: PIXI.Loader) {
        console.log(`Loading ${loader.progress}%`)
        let offset = 50
        let barWidth = (this.game.pixi.screen.width - (offset * 2)) * (loader.progress / 100)
        this.graphics.clear()
        this.graphics.beginFill(0x32DE49)
        this.graphics.drawRect(offset, this.game.pixi.screen.height / 2 - 20, barWidth, 40)
        this.graphics.endFill()
    }
}