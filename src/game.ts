import * as PIXI from "pixi.js"
import { Application } from "pixi.js"
import player from "./images/Screenshot_12.png"
import object from "./images/Screenshot_13.png"

export class Game {

    pixi: PIXI.Application
    loader: PIXI.Loader
    player: PIXI.Sprite
    object: PIXI.Sprite
    speed: number = 4
    stoplogging: boolean = false
    score: number = 0
    basicText: PIXI.Text;
    textStyle: PIXI.TextStyle;

    constructor() {
        this.pixi = new PIXI.Application({ width: 800, height: 500, backgroundColor: 0x2a73e8 })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader
            .add("playerTexture", player)
            .add("objectTexture", object)
        this.loader.load(() => this.doneLoading())
    }

    doneLoading() {
        this.player = new PIXI.Sprite(this.loader.resources["playerTexture"].texture!)
        this.object = new PIXI.Sprite(this.loader.resources["playerTexture"].texture!)

        this.player.x = 790;
        this.player.y = this.pixi.view.height / 2;
        this.player.anchor.set(0.5);

        this.object.x = 10;
        this.object.y = this.pixi.view.height / 2;
        this.object.anchor.set(0.5);

        this.pixi.stage.addChild(this.player);
        this.pixi.stage.addChild(this.object);

        this.pixi.ticker.add((delta) => this.update(delta))


        this.textStyle = new PIXI.TextStyle({
            fontSize: 31,
            fontWeight: "bold",
            trim: false
        });

        this.basicText = new PIXI.Text(`Score ${this.score}`, this.textStyle);
        this.basicText.x = 10
        this.basicText.y = 10

        this.pixi.stage.addChild(this.basicText)
    }

    update(delta: number) {
        this.player.x -= this.speed
        this.object.x += this.speed

        if (this.collision(this.player, this.object)) {
            this.score++;
            console.log(this.score)

                console.log("player touches object")

                this.pixi.stage.removeChild(this.basicText)
                this.basicText = new PIXI.Text(`Score ${this.score}`, this.textStyle);
                this.basicText.x = 10
                this.basicText.y = 10
                this.pixi.stage.addChild(this.basicText)
            
            this.speed = 0;

            this.pixi.stage.removeChild(this.object)  
            this.object = new PIXI.Sprite()                                     

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

new Game()