import * as PIXI from "pixi.js"
import player from "./images/Screenshot_12.png"
import object from "./images/Screenshot_13.png"
import { Player } from "./Player"
import { Object } from "./Object"

class Game {
    pixi: PIXI.Application
    loader: PIXI.Loader
    player: Player
    object: Object
    objects: Object[] = []
    speed: number = 4
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
        this.player = new Player(this.loader.resources["playerTexture"].texture!)
        this.object = new Object(this.loader.resources["playerTexture"].texture!)
        this.objects.push(this.object)

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
        this.player.update()
        this.object.update()


        for (let i = 0; i < this.objects.length; i++) {
            if (this.collision(this.player, this.objects[i])) {
                this.score++;
                console.log(this.score)

                console.log("player touches object")

                this.basicText.text = `Score ${this.score}`

                this.speed = 0;
                this.object.x = 10;

                this.objects[i].destroy();
                this.objects.splice(i, 1)
            }
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
