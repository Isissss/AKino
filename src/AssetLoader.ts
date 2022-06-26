import * as PIXI from "pixi.js"
import { Game } from "./Game"

import sharkImage from "./images/dino.png"
import bubbleImage from "./images/bubble.png"
import pauseImage from "./images/pauseButton.png"
import waterImage from "./images/water.jpg"
import heartImage from "./images/heart.png"
import cityImage from "./images/pixelMap.png"
import SolarImage from "./images/object1.png"
import WindmillImage from "./images/object2.png"
import leafImage from "./images/leaf.png"
import dinoImage from "./images/dino.png"
import buildingTexture1 from "./images/A1.png"
import buildingTexture2 from "./images/A2.png"
import buildingTexture3 from "./images/A3.png"
import buildingA1 from "./images/A1.png"
import buildingA2 from "./images/A2.png"
import buildingA3 from "./images/A3.png"
import buildingB1 from "./images/B1.png"
import buildingB2 from "./images/B2.png"
import buildingB3 from "./images/B3.png"
import buildingC1 from "./images/C1.png"
import buildingC2 from "./images/C2.png"
import buildingC3 from "./images/C3.png"
import buildingD1 from "./images/D1.png"
import buildingD2 from "./images/D2.png"
import buildingD3 from "./images/D3.png"
import buildingE1 from "./images/E1.png"
import buildingE2 from "./images/E2.png"
import buildingE3 from "./images/E3.png"
import buildingF1 from "./images/F1.png"
import buildingF2 from "./images/F2.png"
import buildingF3 from "./images/F3.png"
import carImage from "./images/car.png"
import menuBackgroundImage from "./images/menuBackground.png" // Menu book
import uiElement0Image from "./images/YellowUI0.png" 
import uiElement1Image from "./images/YellowUI1.png" 
import uiElement2Image from "./images/YellowUI2.png" 
import uiElement3Image from "./images/YellowUI3.png" 
import uiElement4Image from "./images/YellowUI4.png" 
import uiElement5Image from "./images/YellowUI5.png" 
import uiElement6Image from "./images/YellowUI6.png" 
import uiElement7Image from "./images/GreenUI0.png" 
import uiElement8Image from "./images/GreenUI1.png" 
import uiElement9Image from "./images/GreenUI2.png" 
import uiElement10Image from "./images/RedUI0.png" 
import uiElement11Image from "./images/RedUI1.png" 
import uiElement12Image from "./images/RedUI2.png" 
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
            .add('buildingA1', buildingA1)
            .add('buildingA2', buildingA2)
            .add('buildingA3', buildingA3)
            .add('buildingB1', buildingB1)
            .add('buildingB2', buildingB2)
            .add('buildingB3', buildingB3)
            .add('buildingC1', buildingC1)
            .add('buildingC2', buildingC2)
            .add('buildingC3', buildingC3)
            .add('buildingD1', buildingD1)
            .add('buildingD2', buildingD2)
            .add('buildingD3', buildingD3)
            .add('buildingE1', buildingE1)
            .add('buildingE2', buildingE2)
            .add('buildingE3', buildingE3)
            .add('buildingF1', buildingF1)
            .add('buildingF2', buildingF2)
            .add('buildingF3', buildingF3)
            .add('leafTexture', leafImage)
            .add('dinoTexture', dinoImage)
            .add('menuBackgroundTexture', menuBackgroundImage)
            .add('pauseTexture', pauseImage)
            .add('uiElement0', uiElement0Image) 
            .add('uiElement1', uiElement1Image) 
            .add('uiElement2', uiElement2Image) 
            .add('uiElement3', uiElement3Image) 
            .add('uiElement4', uiElement4Image) 
            .add('uiElement5', uiElement5Image) 
            .add('uiElement6', uiElement6Image) 
            .add('uiElement7', uiElement7Image) 
            .add('uiElement8', uiElement8Image) 
            .add('uiElement9', uiElement9Image) 
            .add('uiElement10', uiElement10Image) 
            .add('uiElement11', uiElement11Image) 
            .add('uiElement12', uiElement12Image) 
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