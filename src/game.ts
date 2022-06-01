import * as PIXI from 'pixi.js'
import sharkImage from "./images/dino.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import cityImage from "./images/city.jpg"
import fishImage from "./images/fish.png"
import carImage from "./images/car.png"
import { Car } from './Car'
import { Rightcar } from './Rightcar'
import { Graphics } from 'pixi.js'
import { Shark } from './Shark'


 export class Game {
    pixi: PIXI.Application
    loader: PIXI.Loader
    shark: Shark
    graphics: Graphics
    cars : Car[] = []
    score: number = 0
    car: Car
    rightcar: Rightcar
    car2: Car
    basicText: PIXI.Text;
    textStyle: PIXI.TextStyle;

    constructor() {
        this.pixi = new PIXI.Application({ width: 1200, height: 700})
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
        this.shark = new Shark(this.loader.resources["sharkTexture"].texture!, this)
        this.car = new Car(this.loader.resources["carTexture"].texture!, true, 640, 40)
       // this.car2 = new Rightcar(this.loader.resources["carTexture"].texture!)

        this.cars.push(this.car)
       // this.cars.push(this.car2)

        let background = new PIXI.Sprite(this.loader.resources["cityTexture"].texture!)
        background.scale.set(2)
        this.pixi.stage.addChild(background)

        this.pixi.stage.addChild(this.shark)
        this.pixi.stage.addChild(this.car)
        //this.pixi.stage.addChild(this.car2)

        this.pixi.ticker.add((delta) => this.update(delta))

        this.textStyle = new PIXI.TextStyle({
            fontSize: 31,
            fontWeight: "bold",
            trim: false
        });

        this.basicText = new PIXI.Text(`Score ${this.score}`, this.textStyle);
        // this.basicText.x = 100
        // this.basicText.y = 100

        this.pixi.stage.addChild(this.basicText)

    }
    update(delta : number) {
       
        for (let i = 0; i < this.cars.length; i++) {
            if (this.collision(this.shark, this.cars[i]) && !this.shark.hit) {
                console.log("player touches object")
                this.shark.hitcar()
                
            }   
       
        }
        this.shark.update(delta)
            for (let car of this.cars) {
                car.update(delta)
            }
 
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

