import * as PIXI from 'pixi.js'
import sharkImage from "./images/dino.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import cityImage from "./images/city.png"
import fishImage from "./images/fish.png"
import carImage from "./images/car.png"
import { Car } from './Car'
import { Graphics } from 'pixi.js'
import { Player } from './Player'


export class Game {
    pixi: PIXI.Application
    loader: PIXI.Loader
    player: Player
    graphics: Graphics
    cars: Car[] = []
    score: number = 0
    car: Car
    car3: Car
    gameover: boolean
    car2: Car
    basicText: PIXI.Text;
    textStyle: PIXI.TextStyle;

    constructor() {
        this.pixi = new PIXI.Application({ width: window.innerWidth - 20, height: window.innerHeight - 20 })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader.add('sharkTexture', sharkImage)
            .add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('cityTexture', cityImage)
            .add('carTexture', carImage)
        this.loader.load(() => this.loadCompleted())

    }

    loadCompleted() {
        this.player = new Player(this.loader.resources["sharkTexture"].texture!, this, 2)
        this.car = new Car(this.loader.resources["carTexture"].texture!, false, 1200, 625, this, 2.5)
        this.car3 = new Car(this.loader.resources["carTexture"].texture!, false, 1400, 625, this, 2.5)
        this.car2 = new Car(this.loader.resources["carTexture"].texture!, true, 640, -300, this, 1.5)

        this.cars.push(this.car)
        this.cars.push(this.car3)
        this.cars.push(this.car2)

        let background = new PIXI.Sprite(this.loader.resources["cityTexture"].texture!)
        background.scale.set(2)
        this.pixi.stage.addChild(background)

        this.pixi.stage.addChild(this.player)
        this.pixi.stage.addChild(this.car)
        this.pixi.stage.addChild(this.car2)
        this.pixi.stage.addChild(this.car3)

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


        for (let i = 0; i < this.cars.length; i++) {
            if (this.collision(this.player, this.cars[i]) && !this.player.hit) {
                console.log("player touches object")
                this.player.hitcar()
                for (let c of this.cars) {
                c.speed = c.speed / 2 }
            }

        }
        this.player.update(delta)
        for (let car of this.cars) {
            car.update(delta)
        }
    }
    public endGame() {
        console.log("game over!")
        this.pixi.stop();
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