import * as PIXI from 'pixi.js'
import fishImage from "./images/fish.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import { Spawn } from './Spawn'

export class Game {

    public pixi : PIXI.Application
    loader : PIXI.Loader
    spawner : Spawn
//
// STAP 1 - maak een pixi canvas
//
constructor() {
    this.pixi = new PIXI.Application({ width: 800, height: 450 })
    document.body.appendChild(this.pixi.view)

    //
    // STAP 2 - preload alle afbeeldingen
    //
    this.loader = new PIXI.Loader()
    this.loader.add('fishTexture', fishImage)
          .add('bubbleTexture', bubbleImage)
         .add('waterTexture', waterImage)
    this.loader.load(()=>this.loadCompleted())

}
//
// STAP 2 - preload alle afbeeldingen
//

//
// STAP 3 - maak een sprite als de afbeeldingen zijn geladen
//
loadCompleted() {
    let water = new PIXI.Sprite(this.loader.resources["waterTexture"].texture!)
    water.scale.set(0.625)
    this.spawner = new Spawn(100, 100, 1000, this.loader.resources["fishTexture"].texture!, this)
    this.pixi.stage.addChild(water)
    this.pixi.stage.addChild(this.spawner)
    this.pixi.ticker.add((delta) => (this.update()))
}

update() {
    this.spawner.update()
}

public spawnObject(sprite : PIXI.Sprite) {
    this.pixi.stage.addChild(sprite)
}

}

new Game