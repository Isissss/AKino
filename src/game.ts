import * as PIXI from 'pixi.js'
import Matter from 'matter-js'


import { Player } from "./Player"
import { Smog } from './Smog'
import { Graphics } from 'pixi.js'
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
import { AssetLoader } from "./AssetLoader"

export class Game {
    pixi: PIXI.Application
    loader: AssetLoader
    player: Player
    map: Map
    smog: Smog
    graphics: Graphics
    spawner: Spawn
    objectTextures: PIXI.Texture[] = []
    objects: Object[] = []
    cars: Car[] = []
    uiTextures: PIXI.Texture[] = []
    ui: UI // UI container class
    startscreen: StartScreen; // container class for the startscreen
    pauseMenu: Menu; // container class for the in-game menu
    states: number[] = [0, 1, 2, 3]// startscreen, in-game, endscreen, game over state
    private _state: number = 0
    menuActive: boolean = false; // variable to check if updates need to be run
    score: number = 0
    car: Car
    car3: Car
    gameover: boolean
    car2: Car
    textStyle: PIXI.TextStyle;
    buildings: Building[] = []
    private dinoTextures: PIXI.Texture[] = [];
    leafs: Leaf[] = []
    weather: Weather
    city: PIXI.TilingSprite
    private _soundFXVolume: number = 0.5 //Volume for sound Effects
    private _bgMusicVolume: number = 0.5 //Volume for Background Music
    private _fontSize: number = 20 //Fontsize for text
    pickUpSound: HTMLAudioElement
    engine: Matter.Engine
    building: Building
    bgMusicSound: HTMLAudioElement
    hitByCarSound: HTMLAudioElement
    ObjectPickupSound: HTMLAudioElement

    constructor() {
        this.pixi = new PIXI.Application({ width: window.innerWidth - 5, height: window.innerHeight - 5, backgroundColor: 0xAAAAA })
        document.body.appendChild(this.pixi.view)

        // Load all images
        this.loader = new AssetLoader(this)
        // Create new matterjs engine for anti-passthrough
        this.engine = Matter.Engine.create()


    }

    public createDinoFrames() {

        for (let i = 1; i < 6; i++) {
            const texture = PIXI.Texture.from(`dino_${i}.png`);
            this.dinoTextures.push(texture);
            //console.log(this.dinoTextures)
        }
    }

    loadCompleted() {
        //create Dino animation frames
        this.createDinoFrames()

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

        //packing object textures into array
        this.objectTextures = [
            this.loader.resources["solarTexture"].texture!,
            this.loader.resources["windmillTexture"].texture!
        ]

        //initialize player, smog, object spawner

        this.player = new Player(this.dinoTextures, this)
        this.smog = new Smog(this.player, window.innerWidth)
        this.spawner = new Spawn(100, 100, (3 * 60), this.objectTextures, this)

        //map        
        this.map = new Map(this, this.player)
        this.pixi.stage.x = this.pixi.screen.width / 2;
        this.pixi.stage.y = this.pixi.screen.height / 2;

        //background
        let background = new PIXI.Sprite(this.loader.resources["cityTexture"].texture!)
        background.anchor.set(0, 0)
        background.position.set(-window.innerWidth / 2, -window.innerHeight / 2)
        background.scale.set(4.475, 3.825)

        //cars
        this.car = new Car(this.loader.resources["carTexture"].texture!, false, 1200, 625)
        this.car3 = new Car(this.loader.resources["carTexture"].texture!, false, 1600, 625)
        this.car2 = new Car(this.loader.resources["carTexture"].texture!, true, 640, -300)

        this.cars.push(this.car, this.car2, this.car3)

        //buildings
        for (let i = 0; i < 5; i++) {
            let building = new Building(100 + (i * 100), 200, this.loader.resources["buildingTexture1"].texture!, this.loader.resources["buildingTexture2"].texture!, this.loader.resources["buildingTexture3"].texture!, this)
            building.scale.set(7)
            this.buildings.push(building)

            let buildingB = new Building(100 + (i * 100), 250, this.loader.resources["buildingB1"].texture!, this.loader.resources["buildingB2"].texture!, this.loader.resources["buildingB3"].texture!, this)
            buildingB.scale.set(7)
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
            fontSize: this.fontSize,
            fontWeight: "bold",
            trim: false
        });

        //set Matter.js gravity
        this.engine.gravity.y = 0

        //ui and menu
        this.ui = new UI(this, this.loader.resources["bubbleTexture"].texture!, this.loader.resources["heartTexture"].texture!) // (game, pausebutton texture, heart texture)

        //audio
        this.bgMusicSound = this.loader.resources["backgroundMusicFile"].data!
        this.bgMusicSound.volume = this.bgMusicVolume
        this.hitByCarSound = this.loader.resources["hitsoundFile"].data!;
        this.hitByCarSound.volume = this.soundFXVolume
        this.ObjectPickupSound = this.loader.resources["pickupsoundFile"].data!
        this.ObjectPickupSound.volume = this.soundFXVolume

        //sorted stage adding 
        this.pixi.stage.addChild(background)

        for (const car of this.cars) {
            this.pixi.stage.addChild(car)
        }
        for (const building of this.buildings) {
            this.pixi.stage.addChild(building)
        }

        this.pixi.stage.addChild(this.player)

        for (const leaf of this.leafs) {
            this.pixi.stage.addChild(leaf)
        }

        this.pixi.stage.addChild(this.smog, this.ui)

        //create start screen
        this.startscreen = new StartScreen(this, this.loader.resources["cityTexture"].texture!, this.loader.resources["menuBackgroundTexture"].texture!, this.uiTextures)
        this.pixi.stage.addChild(this.startscreen)
        this.menuActive = true;
        this.ui.visible = false;

        //start running the ticker
        this.pixi.ticker.add((delta) => this.update(delta))

    }

    private update(delta: number) {
        switch (this.state) {
            case 0: //startscreen state
                this.updateVolume()
                break;
            case 1: //in-game state
                if (!this.menuActive) { // pixi.stop() might be a better idea
                    this.spawner.update()
                    this.player.update(delta)
                    this.smog.update()
                    Matter.Engine.update(this.engine, 1000 / 60)
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
                            this.player.hitcar()
                            this.hitByCarSound.play()
                            this.hitByCarSound.volume = this.soundFXVolume
                        }

                    }
                    for (let car of this.cars) {
                        car.update(delta)
                    }

                    for (let i = 0; i < this.objects.length; i++) {
                        if (this.collision(this.player, this.objects[i])) {

                            this.score++;
                            this.objects[i].pickedUp()
                            this.smog.reset()
                            if (this.score >= 20) {
                                this.endGame(2)
                            }

                            //console.log("player touches object")


                            this.objects[i].destroy();
                            this.objects.splice(i, 1)

                        }
                    }
                    this.ui.healthDisplay.update()
                    this.updateVolume()
                }
                break;
            case 2: //finished game state
                this.updateVolume()
                this.ui.visible = false
                this.togglePauseMenu()
                this.pixi.stop()
                break;
            case 3://game over state
                this.updateVolume()
                this.ui.visible = false
                this.togglePauseMenu()
                this.pixi.stop()
                break;
        }

    }


    public get state(): number {
        return this._state;
    }

    public set state(v: number) {
        if (v >= 0 && v < this.states.length) {
            this._state = v;
        } else {
            console.log(`Can't set state with value: ${v}`)
        }
    }

    public get bgMusicVolume(): number {
        return this._bgMusicVolume;
    }

    public set bgMusicVolume(v: number) {
                
        if (v >= 0 && v <= 1) {
            this._bgMusicVolume = v            
        }
        else {
            console.log(`not a volume: ${v}`)
        }

    }

    public get soundFXVolume(): number {
        return this._soundFXVolume;
    }

    public set soundFXVolume(v: number) {                
        if (v >= 0 && v <= 1) {
            this._soundFXVolume = v            
        }else {
            console.log(`not a volume: ${v}`)
        }

    }

    public get fontSize(): number {
        return this._fontSize;
    }

    public set fontSize(v: number) {      
        if (v >= 0 && v <= 40) {
            this._fontSize = v
        }else {
            console.log(`fontsize too large: ${v}`)
        }
    }

    public updateWeather(x: number, y: number) {
        for (let i = 0; i < this.leafs.length; i++) {
            this.leafs[i].changeWeather(x, y)
        }
    }


    public endGame(state: number) {
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


    public updateVolume(){
        this.bgMusicSound.volume = this.bgMusicVolume
        this.ObjectPickupSound.volume = this.soundFXVolume
        this.hitByCarSound.volume = this.soundFXVolume
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

