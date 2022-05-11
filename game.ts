import * as PIXI from 'pixi.js'
import fishImage from "./images/fish.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"

//
// STAP 1 - maak een pixi canvas
//
const pixi = new PIXI.Application({ width: 800, height: 450 })
document.body.appendChild(pixi.view)

//
// STAP 2 - preload alle afbeeldingen
//
const loader = new PIXI.Loader()
loader.add('fishTexture', fishImage)
      .add('bubbleTexture', bubbleImage)
      .add('waterTexture', waterImage)
loader.load(()=>loadCompleted())

//
// STAP 3 - maak een sprite als de afbeeldingen zijn geladen
//
function loadCompleted() {
    let fish = new PIXI.Sprite(loader.resources["fishTexture"].texture!)
    pixi.stage.addChild(fish)
}