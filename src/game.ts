import * as PIXI from 'pixi.js'

import sharkImage from "./images/dino.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import smokeImage from "./images/smog.png"
import cityImage from "./images/city.png"
import fishImage from "./images/fish.png"
import leafImage from "./images/leaf.png"
import dinoImage from "./images/dino.png"
import buildingTexture1 from "./images/buildingTexture1.png"
import buildingTexture2 from "./images/buildingTexture2.png"
import buildingTexture3 from "./images/buildingTexture3.png"
import buildingB1 from "./images/buildingB1.png"
import buildingB2 from "./images/buildingB2.png"
import buildingB3 from "./images/buildingB3.png"
import carImage from "./images/car.png"
import HPDbackgroundImage from "./images/tile.png" // needs replacement / better way of creating the background
import menuBackgroundImage from "./images/menuBackground.png" // Menu book
import uiElement0Image from "./images/YellowUI0.png" // cant get spritesheets to work
import uiElement1Image from "./images/YellowUI1.png" // cant get spritesheets to work
import uiElement2Image from "./images/YellowUI2.png" // cant get spritesheets to work
import uiElement3Image from "./images/YellowUI3.png" // cant get spritesheets to work
import uiElement4Image from "./images/YellowUI4.png" // cant get spritesheets to work
import uiElement5Image from "./images/YellowUI5.png" // cant get spritesheets to work
import uiElement6Image from "./images/YellowUI6.png" // cant get spritesheets to work
import uiElement7Image from "./images/GreenUI0.png" // cant get spritesheets to work
import uiElement8Image from "./images/GreenUI1.png" // cant get spritesheets to work
import uiElement9Image from "./images/GreenUI2.png" // cant get spritesheets to work
import uiElement10Image from "./images/RedUI0.png" // cant get spritesheets to work
import uiElement11Image from "./images/RedUI1.png" // cant get spritesheets to work
import uiElement12Image from "./images/RedUI2.png" // cant get spritesheets to work

import { Player } from "./Player"
import { Smog } from './Smog'
import { Graphics, Spritesheet, TilingSprite } from 'pixi.js'
import { Spawn } from './Spawn'
import { Object } from './Object'
import { Building } from './Building'
import { Car } from './Car'
import { Weather } from "./Weather"
import { Leaf } from './Leaf'
import { UI } from './UI'
import { Menu } from './Menu'
import { Map } from "./Map"
import { StartScreen } from './StartScreen'

export class Game {
    pixi: PIXI.Application
    loader: PIXI.Loader
    player: Player
    map: Map
    smog: Smog
    graphics: Graphics
    spawner: Spawn
    objects: Object[] = []
    cars: Car[] = []
    uiTextures: PIXI.Texture[] = []
    ui: UI // UI container class
    startscreen: StartScreen; // container class for the startscreen
    pauseMenu: Menu; // container class for the in-game menu
    states: number[] = [0,1,2,3]// startscreen, in-game, endscreen, game over state
    private _state: number = 0
    menuActive: boolean = false; // variable to check if updates need to be run
    score: number = 0
    car: Car
    car3: Car
    gameover: boolean
    car2: Car
    basicText: PIXI.Text;
    textStyle: PIXI.TextStyle;
    buildings: Building[] = []
    leafs: Leaf[] = []
    weather: Weather
    city: PIXI.TilingSprite
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
            .add('cityTexture', cityImage)
            .add('carTexture', carImage)
            .add('buildingTexture1', buildingTexture1)
            .add('buildingTexture2', buildingTexture2)
            .add('buildingTexture3', buildingTexture3)
            .add('buildingB1', buildingB1)
            .add('buildingB2', buildingB2)
            .add('buildingB3', buildingB3)
            .add('leafTexture', leafImage)
            .add('dinoTexture', dinoImage)
            .add('HPDbackgroundTexture', HPDbackgroundImage)
            .add('menuBackgroundTexture', menuBackgroundImage)
            .add('uiElement0', uiElement0Image) // cant get spritesheets to work
            .add('uiElement1', uiElement1Image) // cant get spritesheets to work
            .add('uiElement2', uiElement2Image) // cant get spritesheets to work
            .add('uiElement3', uiElement3Image) // cant get spritesheets to work
            .add('uiElement4', uiElement4Image) // cant get spritesheets to work
            .add('uiElement5', uiElement5Image) // cant get spritesheets to work
            .add('uiElement6', uiElement6Image) // cant get spritesheets to work
            .add('uiElement7', uiElement7Image) // cant get spritesheets to work
            .add('uiElement8', uiElement8Image) // cant get spritesheets to work
            .add('uiElement9', uiElement9Image) // cant get spritesheets to work
            .add('uiElement10', uiElement10Image) // cant get spritesheets to work
            .add('uiElement11', uiElement11Image) // cant get spritesheets to work
            .add('uiElement12', uiElement12Image) // cant get spritesheets to work
        this.loader.load(() => this.loadCompleted())
    }

    loadCompleted() {
        //packing UI textures into array
        this.uiTextures = [
            this.loader.resources["uiElement0"].texture!,
            this.loader.resources["uiElement1"].texture!,
            this.loader.resources["uiElement2"].texture!,
            this.loader.resources["uiElement3"].texture!,
            this.loader.resources["uiElement4"].texture!,
            this.loader.resources["uiElement5"].texture!,
            this.loader.resources["uiElement6"].texture!,
            this.loader.resources["uiElement7"].texture!,
            this.loader.resources["uiElement8"].texture!,
            this.loader.resources["uiElement9"].texture!,
            this.loader.resources["uiElement10"].texture!,
            this.loader.resources["uiElement11"].texture!,
            this.loader.resources["uiElement12"].texture!
        ]

        this.player = new Player(this, this.loader.resources["sharkTexture"].texture!)
        this.smog = new Smog(this.player, window.innerWidth)
        this.spawner = new Spawn(100, 100, (3 * 60), this.loader.resources["fishTexture"].texture!, this)

        //map        
        this.map = new Map(this, this.player)
        this.pixi.stage.x = this.pixi.screen.width / 2;
        this.pixi.stage.y = this.pixi.screen.height / 2;

        //background
        let background = new PIXI.Sprite(this.loader.resources["cityTexture"].texture!)
        background.scale.set(2)        

        //city
        let city = new PIXI.Sprite(this.loader.resources["cityTexture"].texture!)
        city.anchor.set(0, 0)
        city.scale.set(3, 2.69)

        //cars
        this.car = new Car(this.loader.resources["carTexture"].texture!, false, 1200, 625)
        this.car3 = new Car(this.loader.resources["carTexture"].texture!, false, 1600, 625)
        this.car2 = new Car(this.loader.resources["carTexture"].texture!, true, 640, -300)

        this.cars.push(this.car, this.car2, this.car3)

        //buildings
        for (let i = 0; i < 5; i++) {
            let building = new Building(100 + (i * 100), 200, this.loader.resources["buildingTexture1"].texture!, this.loader.resources["buildingTexture2"].texture!, this.loader.resources["buildingTexture3"].texture!)
            this.buildings.push(building)

            let buildingB = new Building(100 + (i * 100), 250, this.loader.resources["buildingB1"].texture!, this.loader.resources["buildingB2"].texture!, this.loader.resources["buildingB3"].texture!)
            this.buildings.push(buildingB)
        }
        this.weather = new Weather(this.player, 1000, this)
        for (let i = 0; i < 4; i++) {
            let leaf = new Leaf(this.loader.resources["leafTexture"].texture!)
            leaf.scale.set(0.3, 0.3)
            leaf.anchor.set(0.5, 0.5)
            this.leafs.push(leaf)
            this.pixi.stage.addChild(leaf)
        }

        this.textStyle = new PIXI.TextStyle({
            fontSize: 31,
            fontWeight: "bold",
            trim: false
        });

        // ui
        this.ui = new UI(this, this.loader.resources["bubbleTexture"].texture!, this.loader.resources["bubbleTexture"].texture!, this.loader.resources["HPDbackgroundTexture"].texture!) // (game, pausebutton texture, heart texture, background texture)

        //basictext?
        this.basicText = new PIXI.Text(`Score ${this.score}`, this.textStyle);
        this.basicText.x = 100
        this.basicText.y = 100

        // stage adding TEMP
        this.pixi.stage.addChild(background, this.player)
        for(const car of this.cars){
            this.pixi.stage.addChild(car)
        }
        for(const building of this.buildings){
            this.pixi.stage.addChild(building)
        }
        for(const leaf of this.leafs){
            this.pixi.stage.addChild(leaf)
        }
        this.pixi.stage.addChild(this.smog, this.ui)        
        this.pixi.stage.addChild(this.basicText)

        //create Start Screen
        this.startscreen = new StartScreen(this,this.loader.resources["cityTexture"].texture! ,this.loader.resources["menuBackgroundTexture"].texture!, this.uiTextures)
        this.pixi.stage.addChild(this.startscreen)
        this.menuActive = true;
        this.ui.visible= false;





        this.pixi.ticker.add((delta) => this.update(delta))

    }

    private update(delta: number) {
        switch (this.state) {
            case 0: // startscreen
                break;
            case 1: // ingame
                if (!this.menuActive) { // pixi.stop() might be a better idea
                    this.spawner.update()
                    this.player.update(delta)
                    this.smog.update()
                    this.weather.update()
                    this.map.update()
                    for (let i = 0; i < this.leafs.length; i++) {
                        this.leafs[i].update()
        
                    }
        
                    for (let building of this.buildings) {
                        building.update(this.score)
                    }
        
                    for (let i = 0; i < this.cars.length; i++) {
                        if (this.collision(this.player, this.cars[i]) && !this.player.hit) {
                            //console.log("player touches object")
                            this.player.hitcar()
        
                        }
        
                    }
                    this.player.update(delta)
                    for (let car of this.cars) {
                        car.update(delta)
                    }
        
                    for (let i = 0; i < this.objects.length; i++) {
                        if (this.collision(this.player, this.objects[i])) {
        
                            this.score++;
                            this.smog.reset()
                            if(this.score >= 20){
                                this.endGame(2)
                            }
        
                            this.basicText.text = `Score ${this.score}`
        
                            //console.log("player touches object")
        
        
                            this.objects[i].destroy();
                            this.objects.splice(i, 1)
        
                        }
                    }
                    this.ui.healthDisplay.update()
                }
                break;
                case 2: // Finsihed Game
                    this.ui.visible = false
                    this.togglePauseMenu()
                    this.pixi.stop()
                    break;
                case 3: // Game Over
                    this.ui.visible = false
                    this.togglePauseMenu()
                    this.pixi.stop()
                    break;
        }
        
    }
    
    public get state() : number {
        return this._state;
    }

    public set state(v : number) {
        if( v >= 0 && v < this.states.length){
        this._state = v;
        } else {
            console.log(`Can't set state with value: ${v}`)
        }
    }
    
    

    public updateWeather(x: number, y: number) {
        for (let i = 0; i < this.leafs.length; i++) {
            this.leafs[i].changeWeather(x, y)
        }
    }

    public endGame(state:number) {
        this.state = state
        console.log(`game over reason: ${state}`)
        
    }

    public spawnObject(object: Object) {
        this.pixi.stage.addChild(object)
        this.objects.push(object)
    }

    private collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }

    public togglePauseMenu() {
        switch (this.menuActive) {
            case false:
                this.menuActive = true;
                this.pauseMenu = new Menu(this, this.loader.resources["menuBackgroundTexture"].texture!, this.uiTextures)
                this.pauseMenu.y = this.map.borderVertical // QUICK FIX ;; DIRTY
                this.pauseMenu.x = this.map.borderHorizontal // QUICK FIX ;; DIRTY
                this.pixi.stage.addChild(this.pauseMenu)
                for (let object of this.objects) {
                    object.visible = false;
                }
                break;
            case true:
                this.menuActive = false;
                this.pauseMenu.destroy()
                for (let object of this.objects) {
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