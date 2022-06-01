import * as PIXI from 'pixi.js'
import { Shark } from "./Shark"
import sharkImage from "./images/shark.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import leafImage from "./images/leaf.png"
import dinoImage from "./images/dino.png"
import cityImage from "./images/city.jpg"
import { Weather } from "./Weather"
import { Leaf } from './Leaf'

export class Game {
    pixi: PIXI.Application
    loader: PIXI.Loader
    leafs : Leaf[] = []
    shark : Shark
    weather : Weather
    city : PIXI.TilingSprite
    

    constructor() {
        this.pixi = new PIXI.Application({ width: window.innerWidth - 5, height: window.innerHeight - 5, backgroundColor: 0xAAAAA })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader.add('sharkTexture', sharkImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)
            .add('leafTexture', leafImage)
            .add('dinoTexture', dinoImage)
            .add('cityTexture', cityImage)
        this.loader.load(() => this.loadCompleted())
    }

    loadCompleted() {
        let city = new PIXI.Sprite(this.loader.resources["cityTexture"].texture!)
        city.anchor.set(0, 0)
        city.scale.set(3, 2.69)
        this.pixi.stage.addChild(city)
        this.shark = new Shark(this.loader.resources["dinoTexture"].texture!)
        this.shark.scale.set(0.2, 0.2)
        this.shark.anchor.set(0.5, 0.5)
        this.weather = new Weather(this.shark, 1000, this)
        for (let i = 0; i < 4; i++) {
            let leaf = new Leaf(this.loader.resources["leafTexture"].texture!)
            leaf.scale.set(0.3,0.3)
            leaf.anchor.set(0.5, 0.5)
            this.leafs.push(leaf)
            this.pixi.stage.addChild(leaf)
        }
        this.pixi.stage.addChild(this.shark)
        this.pixi.ticker.add((delta) => this.update())
    }

    updateWeather(x : number, y : number) {
        for (let i = 0; i < this.leafs.length; i++) {
            this.leafs[i].changeWeather(x, y)          
        }
    }

    update (){
        this.shark.update()
        this.weather.update()
        for (let i = 0; i < this.leafs.length; i++) {
            this.leafs[i].update()
            
        }
    }

}
new Game