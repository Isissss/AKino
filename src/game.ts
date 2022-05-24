import * as PIXI from 'pixi.js'
import { Shark } from "./Shark"
import sharkImage from "./images/shark.png"
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
    smog: Smog
    graphics: Graphics
    spawner: Spawn
    objects : Object[] = []

    constructor() {
        this.pixi = new PIXI.Application({ width: window.innerWidth - 5, height: window.innerHeight - 5, backgroundColor: 0xAAAAA })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader.add('sharkTexture', sharkImage)
            .add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)
        this.loader.load(() => this.loadCompleted())
    }

    loadCompleted() {
        this.shark = new Shark(this.loader.resources["sharkTexture"].texture!)
        this.smog = new Smog(this.shark, window.innerWidth)
        this.spawner = new Spawn(100, 100, (3 * 60), this.loader.resources["fishTexture"].texture!, this)
        this.pixi.stage.addChild(this.smog)
        this.pixi.stage.addChild(this.spawner)
        this.pixi.stage.addChild(this.shark)
        this.pixi.ticker.add((delta) => this.update())

    }
    update() {
        this.spawner.update()
        this.shark.update()
        this.smog.update()
        for (let i = 0; i < this.objects.length; i++) {
            if (this.collision(this.shark, this.objects[i])) {


                console.log("player touches object")
    
    
                this.objects[i].destroy();
                this.objects.splice(i, 1)
    
            }  
        }
    }

    public spawnObject(object: Object) {
        this.pixi.stage.addChild(object)
        this.objects.push(object)
    }

    collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
}

let g = new Game

