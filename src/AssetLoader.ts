import * as PIXI from "pixi.js"
import { Game } from "./Game"

import sharkImage from "./images/dino.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import heartImage from "./images/heart.png"
//import smokeImage from "./images/smog.png"
import cityImage from "./images/pixelMap.png"
import SolarImage from "./images/object1.png"
import WindmillImage from "./images/object2.png"
import leafImage from "./images/leaf.png"
import dinoImage from "./images/dino.png"
import buildingTexture1 from "./images/A1.png"
import buildingTexture2 from "./images/A2.png"
import buildingTexture3 from "./images/A3.png"
import buildingB1 from "./images/B1.png"
import buildingB2 from "./images/B2.png"
import buildingB3 from "./images/B3.png"
import carImage from "./images/car.png"
import HPDbackgroundImage from "./images/tile.png" // needs replacement / better way of creating the background
import menuBackgroundImage from "./images/menuBackground.png" // Menu book
import uiElement0Image from "./images/YellowUI0.png" // cant get spritesheets to work
import uiElement1Image from "./images/YellowUI1.png" // cant get spritesheets to work
import uiElement2Image from "./images/YellowUI2.png" // cant get spritesheets to work
import uiElement3Image from "./images/YellowUI3.png" // cant get spritesheets to work
import uiElement4Image from "./images/YellowUI4.png" // cant get spritesheets to work
import uiElement5Image from "./images/YellowUI5.png" // cant get spritesheets to work
import uiElement6Image from "./images/YellowUI6.png" // cant get spritesheets to work
import uiElement7Image from "./images/GreenUI0.png" // cant get spritesheets to work
import uiElement8Image from "./images/GreenUI1.png" // cant get spritesheets to work
import uiElement9Image from "./images/GreenUI2.png" // cant get spritesheets to work
import uiElement10Image from "./images/RedUI0.png" // cant get spritesheets to work
import uiElement11Image from "./images/RedUI1.png" // cant get spritesheets to work
import uiElement12Image from "./images/RedUI2.png" // cant get spritesheets to work
import audioScreenImage from "./images/audioscreen.png"

import backgroundMusic from "url:./sound/relaxing.mp3"
import pickUpSound from "url:./sound/pickupsound.mp3"
import hitSound from "url:./sound/hitsound.mp3"

export class AssetLoader extends PIXI.Loader {

    graphics: PIXI.Graphics
    game: Game

    constructor(game: Game) {
        super()

        this.game = game
        this.graphics = new PIXI.Graphics()
        game.pixi.stage.addChild(this.graphics)

        this.add('sharkTexture', sharkImage)
            .add('solarTexture', SolarImage)
            .add('windmillTexture', WindmillImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)
            .add('cityTexture', cityImage)
            .add('carTexture', carImage)
            .add('buildingTexture1', buildingTexture1)
            .add('buildingTexture2', buildingTexture2)
            .add('buildingTexture3', buildingTexture3)
            .add('buildingB1', buildingB1)
            .add('buildingB2', buildingB2)
            .add('buildingB3', buildingB3)
            .add('leafTexture', leafImage)
            .add('dinoTexture', dinoImage)
            .add('HPDbackgroundTexture', HPDbackgroundImage)
            .add('menuBackgroundTexture', menuBackgroundImage)
            .add('uiElement0', uiElement0Image) // cant get spritesheets to work
            .add('uiElement1', uiElement1Image) // cant get spritesheets to work
            .add('uiElement2', uiElement2Image) // cant get spritesheets to work
            .add('uiElement3', uiElement3Image) // cant get spritesheets to work
            .add('uiElement4', uiElement4Image) // cant get spritesheets to work
            .add('uiElement5', uiElement5Image) // cant get spritesheets to work
            .add('uiElement6', uiElement6Image) // cant get spritesheets to work
            .add('uiElement7', uiElement7Image) // cant get spritesheets to work
            .add('uiElement8', uiElement8Image) // cant get spritesheets to work
            .add('uiElement9', uiElement9Image) // cant get spritesheets to work
            .add('uiElement10', uiElement10Image) // cant get spritesheets to work
            .add('uiElement11', uiElement11Image) // cant get spritesheets to work
            .add('uiElement12', uiElement12Image) // cant get spritesheets to work
            .add('heartTexture', heartImage)
            .add('audioScreenTexture', audioScreenImage)
            .add("backgroundMusicFile", backgroundMusic)
            .add("pickupsoundFile", pickUpSound)
            .add("hitsoundFile", hitSound)
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