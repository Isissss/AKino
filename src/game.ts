import * as PIXI from 'pixi.js'
import { Shark } from "./Shark"
import sharkImage from "./images/dino.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import smokeImage from "./images/smog.png"
import fishImage from "./images/fish.png"
import HPDbackgroundImage from "./images/tile.png" // needs replacement / better way of creating the background
import menuBackgroundImage from "./images/menuBackground.png" // Menu book
import uiElement0Image from "./images/YellowUI0.png" // cant get spritesheets to work
import uiElement1Image from "./images/YellowUI1.png" // cant get spritesheets to work
import uiElement2Image from "./images/YellowUI2.png" // cant get spritesheets to work
import uiElement3Image from "./images/YellowUI3.png" // cant get spritesheets to work
import { Smog } from './Smog'
import { Graphics, Spritesheet } from 'pixi.js'
import { Spawn } from './Spawn'
import { Object } from './Object'
import { UI } from './UI'
import { Menu } from './Menu'

export class Game {
    pixi: PIXI.Application;
    loader: PIXI.Loader;
    shark: Shark;
    smog: Smog;
    graphics: Graphics;
    spawner: Spawn;
    objects: Object[] = [];
    uiTextures: PIXI.Texture[] = []
    ui: UI // UI container class
    pauseMenu: Menu; // container class for the menu
    menuActive: boolean = false; // variable to check if updates need to be run
    score: number = 0;
    basicText: PIXI.Text;
    textStyle: PIXI.TextStyle;
    soundFX: number = 50 // temp placeholder for volume Sound Effects => number
    bgMusic: number = 50 // temp placeholder for volume Background Music => number
    fontSize: number = 20 // placeholder for fontsize => number


    constructor() {
        this.pixi = new PIXI.Application({ width: window.innerWidth - 5, height: window.innerHeight - 5, backgroundColor: 0xAAAAA })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader            
            .add('sharkTexture', sharkImage)
            .add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)
            .add('HPDbackgroundTexture', HPDbackgroundImage)
            .add('menuBackgroundTexture', menuBackgroundImage)
            .add('uiElement0', uiElement0Image) // cant get spritesheets to work
            .add('uiElement1', uiElement1Image) // cant get spritesheets to work
            .add('uiElement2', uiElement2Image) // cant get spritesheets to work
            .add('uiElement3', uiElement3Image) // cant get spritesheets to work         
        this.loader.load(() => this.loadCompleted())
    }

    loadCompleted() {
        this.uiTextures = [
            this.loader.resources["uiElement0"].texture!,
            this.loader.resources["uiElement1"].texture!,
            this.loader.resources["uiElement2"].texture!,
            this.loader.resources["uiElement3"].texture!        
        ]

        this.textStyle = new PIXI.TextStyle({
            fontSize: this.fontSize,
            fontWeight: "bold",
            trim: false
        });

        this.shark = new Shark(this.loader.resources["sharkTexture"].texture!)
        this.smog = new Smog(this.shark, window.innerWidth)
        this.spawner = new Spawn(100, 100, (3 * 60), this.loader.resources["fishTexture"].texture!, this)
        this.ui = new UI(this, this.loader.resources["bubbleTexture"].texture!, this.loader.resources["bubbleTexture"].texture!, this.loader.resources["HPDbackgroundTexture"].texture!) // (game, pausebutton texture, heart texture, background texture)
        this.pauseMenu = new Menu(this, this.loader.resources["menuBackgroundTexture"].texture!, this.uiTextures) 
        this.pauseMenu.visible = false;
        this.pixi.stage.addChild(this.smog, this.shark, this.ui, this.pauseMenu) // made the adding to stage a single line, doesnt need this.spawner
        this.pixi.ticker.add((delta) => this.update())

        

        this.basicText = new PIXI.Text(`Score ${this.score}`, this.textStyle);
        this.basicText.x = 100
        this.basicText.y = 100

        this.pixi.stage.addChild(this.basicText)

    }
    update() {
        if (!this.menuActive) { // pixi.stop() might be a better idea
            this.spawner.update()
            this.shark.update()
            this.smog.update()
            for (let i = 0; i < this.objects.length; i++) {
                if (this.collision(this.shark, this.objects[i])) {

                    this.score++;

                    this.basicText.text = `Score ${this.score}`

                    //console.log("player touches object")


                    this.objects[i].destroy();
                    this.objects.splice(i, 1)

                }
            }
        }
        // else {
        //     this.pixi.stop() // needs a way to start pixi again though
        // }
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

    public togglePauseMenu(){
        switch (this.menuActive){
            case false:
                this.menuActive = true;
                this.pauseMenu.visible = true;
                for(let object of this.objects){
                    object.visible = false;
                }
                break;
            case true:
                this.menuActive = false;
                this.pauseMenu.visible = false;
                for(let object of this.objects){
                    object.visible = true
                }
                
                break;
            default:
                console.log('error toggling pausemenu')
                break;
        }

    }
}

let g = new Game

