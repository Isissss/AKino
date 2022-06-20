import * as PIXI from 'pixi.js'
import { Game } from './game'
import { Menu } from './Menu'

export class StartScreen extends PIXI.Container{

    game: Game
    background: PIXI.Sprite
    menuBackground: PIXI.Texture
    name: string
    style: PIXI.TextStyle
    title: PIXI.Text
    uiElements: PIXI.Texture[]
    startMenu: Menu


    constructor(game: Game, screenBackground: PIXI.Texture, menuBackgroundTexture: PIXI.Texture, uiElements: PIXI.Texture[]){
        super()
        this.game = game;
        this.background = new PIXI.Sprite(screenBackground)
        this.background.anchor.set(0.5)
        this.background.scale.set(3)
        this.style= new PIXI.TextStyle({
                dropShadow: true,
                dropShadowAlpha: 0.8,
                dropShadowAngle: 0.1,
                dropShadowBlur: 10,
                dropShadowColor: "#e34a6f",
                dropShadowDistance: 3,
                fill: "#eeeeee",
                fontFamily: "Tahoma, Geneva, sans-serif",
                fontSize: 128,
                fontVariant: "small-caps",
                fontWeight: "700",
                lineJoin: "bevel",
                stroke: "#e34a6f",
                strokeThickness: 5
            })
        this.name = "AKino"
        this.title = new PIXI.Text(this.name, this.style)
        this.title.anchor.set(0.5, 0)
        this.title.x = 0
        this.title.y = 0 - window.innerHeight/2 + 15
        
        this.menuBackground = menuBackgroundTexture;
        this.uiElements = uiElements;

        this.startMenu = new Menu(this.game, this.menuBackground, this.uiElements)
        this.addChild(this.background, this.startMenu, this.title)

    }
}