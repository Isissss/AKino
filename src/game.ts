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
import { Arcade } from './arcade/arcade'

export class Game {
    pixi: PIXI.Application
    loader: AssetLoader
    player: Player
    private arcade: Arcade
    private joystickListener: EventListener
    map: Map
    smog: Smog
    graphics: Graphics
    spawner: Spawn
    objectTextures: PIXI.Texture[] = []
    buildingTextures: PIXI.Texture[][] = []
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
    car2: Car
    private endscore : number = 50
    car3: Car
    car4: Car
    gameover: boolean
    basicText: PIXI.Text;
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
    public filter: PIXI.Filter
  
    constructor() {
        this.pixi = new PIXI.Application( {width: 1440, height: 900, backgroundColor: 0xAAAAA })
        console.log(window.innerHeight)
        console.log(window.innerWidth)
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
        // Initialize joystick class    
        this.arcade = new Arcade(this)

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
        //packing building textures into array
        this.buildingTextures = [
            [this.loader.resources["buildingA1"].texture!, this.loader.resources["buildingA2"].texture!, this.loader.resources["buildingA3"].texture!],
            [this.loader.resources["buildingB1"].texture!, this.loader.resources["buildingB2"].texture!, this.loader.resources["buildingB3"].texture!],
            [this.loader.resources["buildingC1"].texture!, this.loader.resources["buildingC2"].texture!, this.loader.resources["buildingC3"].texture!],
            [this.loader.resources["buildingD1"].texture!, this.loader.resources["buildingD2"].texture!, this.loader.resources["buildingD3"].texture!],
            [this.loader.resources["buildingE1"].texture!, this.loader.resources["buildingE2"].texture!, this.loader.resources["buildingE3"].texture!],
            [this.loader.resources["buildingF1"].texture!, this.loader.resources["buildingF2"].texture!, this.loader.resources["buildingF3"].texture!]
        ]


        //initialize player, smog, object spawner

        this.joystickListener = (e: Event) => this.initJoystick(e as CustomEvent)
        document.addEventListener("joystickcreated", this.joystickListener)

     
        this.smog = new Smog(this.player, window.innerWidth)
        this.spawner = new Spawn(100, 100, (3 * 60), this.objectTextures, this)

    
        //map        
        this.map = new Map(this, this.player)
        this.pixi.stage.x = this.pixi.screen.width / 2;
        this.pixi.stage.y = this.pixi.screen.height / 2;

        //background
        let background = new PIXI.Sprite(this.loader.resources["cityTexture"].texture!)
        this
        background.anchor.set(0,0)
        background.position.set(-window.innerWidth/2,-window.innerHeight/2)
        background.scale.set(4.48, 3.6)

        //cars
        this.car = new Car(this.loader.resources["carTexture"].texture!, 1, -1000, 60)
        this.car2 = new Car(this.loader.resources["carTexture"].texture!, 2, 1960, -500)
        this.car3 = new Car(this.loader.resources["carTexture"].texture!, 3, 2900, 750)
        this.car4 = new Car(this.loader.resources["carTexture"].texture!, 4, -50, 1450)
      
        //this.car3 = new Car(this.loader.resources["carTexture"].texture!, false, 1600, 625)
        //this.car2 = new Car(this.loader.resources["carTexture"].texture!, true, 640, -300)

        this.cars.push(this.car, this.car2, this.car3, this.car4)

        //buildings
        for (let i = 0; i < 5; i++) {
            let randomizer = Math.round(Math.random() * 5)
        
            let building = new Building(Math.random() * 700 + 190, Math.random() * 300 - 390, this.buildingTextures[randomizer][0], this.buildingTextures[randomizer][1], this.buildingTextures[randomizer][2], this)
            building.scale.set(7)
            this.buildings.push(building)
        }
        for (let i = 0; i < 5; i++) {
            let randomizer = Math.round(Math.random() * 5)
            let building = new Building(Math.random() * 600 - 920, Math.random() * 300 + 340, this.buildingTextures[randomizer][0], this.buildingTextures[randomizer][1], this.buildingTextures[randomizer][2], this)
            building.scale.set(7)
            this.buildings.push(building)
        }
        for (let i = 0; i < 5; i++) {
            let randomizer = Math.round(Math.random() * 5)
            let building = new Building(Math.random() * 700 + 120, Math.random() * 300 + 1090, this.buildingTextures[randomizer][0], this.buildingTextures[randomizer][1], this.buildingTextures[randomizer][2], this)
            building.scale.set(7)
            this.buildings.push(building)
        }
        for (let i = 0; i < 5; i++) {
            let randomizer = Math.round(Math.random() * 5)
            let building = new Building(Math.random() * 700 + 1090, Math.random() * 300 + 1090, this.buildingTextures[randomizer][0], this.buildingTextures[randomizer][1], this.buildingTextures[randomizer][2], this)
            building.scale.set(7)
            this.buildings.push(building)
        }
        for (let i = 0; i < 5; i++) {
            let randomizer = Math.round(Math.random() * 5)
            let building = new Building(Math.random() * 700 + 1090, Math.random() * 300 - 390, this.buildingTextures[randomizer][0], this.buildingTextures[randomizer][1], this.buildingTextures[randomizer][2], this)
            building.scale.set(7)
            this.buildings.push(building)
        }
        for (let i = 0; i < 5; i++) {
            let randomizer = Math.round(Math.random() * 5)
            let building = new Building(Math.random() * 600 + 2290, Math.random() * 300 + 340, this.buildingTextures[randomizer][0], this.buildingTextures[randomizer][1], this.buildingTextures[randomizer][2], this)
            building.scale.set(7)
            this.buildings.push(building)
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
        this.ui = new UI(this, this.loader.resources["pauseTexture"].texture!, this.loader.resources["heartTexture"].texture!) // (game, pausebutton texture, heart texture)

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
        for (let joystick of this.arcade.Joysticks) {
            joystick.update()
        }
        
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
                            if (this.score >= this.endscore) {
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

    private initJoystick(e: CustomEvent) {

        let joystick = this.arcade.Joysticks[e.detail]

        for (const buttonEvent of joystick.ButtonEvents) {
            document.addEventListener(buttonEvent, () => console.log(buttonEvent))
        }

        this.player = new Player(this.dinoTextures, joystick, this)
 

        // alternatively you can handle single buttons
        // Handle button 0 (this is the first button, X-Button on a PS4 controller)
        // document.addEventListener(joystick.ButtonEvents[0], () => this.handleJump())
    }

    public disconnect() {
        document.removeEventListener("joystickcreated", this.joystickListener)
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

