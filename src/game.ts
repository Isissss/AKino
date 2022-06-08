import * as PIXI from 'pixi.js'
import { Player } from "./Player"
import sharkImage from "./images/dino.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import smokeImage from "./images/smog.png"
import fishImage from "./images/fish.png"
import buildingTexture1 from "./images/buildingTexture1.png"
import buildingTexture2 from "./images/buildingTexture2.png"
import buildingTexture3 from "./images/buildingTexture3.png"
import buildingB1 from "./images/buildingB1.png"
import buildingB2 from "./images/buildingB2.png"
import buildingB3 from "./images/buildingB3.png"
import { Smog } from './Smog'
import { Graphics } from 'pixi.js'
import { Spawn } from './Spawn'
import { Object } from './Object'
import { Building } from './Building'

export class Game {
    pixi: PIXI.Application
    loader: PIXI.Loader
    player: Player
    smog: Smog
    graphics: Graphics
    spawner: Spawn
    objects: Object[] = []
    score: number = 0
    basicText: PIXI.Text;
    textStyle: PIXI.TextStyle;
    buildings: Building[] = []

    constructor() {
        this.pixi = new PIXI.Application({ width: window.innerWidth - 5, height: window.innerHeight - 5, backgroundColor: 0xAAAAA })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader.add('sharkTexture', sharkImage)
            .add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)
            .add('buildingTexture1', buildingTexture1)
            .add('buildingTexture2', buildingTexture2)
            .add('buildingTexture3', buildingTexture3)
            .add('buildingB1', buildingB1)
            .add('buildingB2', buildingB2)
            .add('buildingB3', buildingB3)
        this.loader.load(() => this.loadCompleted())
    }

    loadCompleted() {
        this.player = new Player(this.loader.resources["sharkTexture"].texture!)
        this.smog = new Smog(this.player, window.innerWidth)
        this.spawner = new Spawn(100, 100, (3 * 60), this.loader.resources["fishTexture"].texture!, this)
        this.pixi.stage.addChild(this.smog)
        this.pixi.stage.addChild(this.spawner)
        this.pixi.stage.addChild(this.player)
        for (let i = 0; i < 5; i++) {
            let building = new Building(100 + (i * 100), 200, this.loader.resources["buildingTexture1"].texture!, this.loader.resources["buildingTexture2"].texture!, this.loader.resources["buildingTexture3"].texture!)
            this.pixi.stage.addChild(building)
            this.buildings.push(building)

            let buildingB = new Building(100 + (i * 100), 250, this.loader.resources["buildingB1"].texture!, this.loader.resources["buildingB2"].texture!, this.loader.resources["buildingB3"].texture!)
            this.pixi.stage.addChild(buildingB)
            this.buildings.push(buildingB)
        }
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
        this.spawner.update()
        this.player.update()
        this.smog.update()
        for (let building of this.buildings) {
            building.update(this.score)
        }
        for (let i = 0; i < this.objects.length; i++) {
            if (this.collision(this.player, this.objects[i])) {

                this.score++;

                this.basicText.text = `Score ${this.score}`

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

