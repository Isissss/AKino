import * as PIXI from 'pixi.js'
import { Button } from './Button'
import { Game } from './game'
import { SettingsPage } from './SettingsPage'

export class Menu extends PIXI.Container {
    background: PIXI.Sprite
    game: Game
    rightPage: SettingsPage

    constructor(game: Game, backgroundTexture: PIXI.Texture, uiElements:PIXI.Texture[]){
        super()
        this.game = game
        this.x = window.innerWidth/2
        this.y = window.innerHeight/2
        this.background = new PIXI.Sprite(backgroundTexture)
        this.background.scale.set(6)
        // set container's height and width to background's height and width.
        // this.width = this.background.width
        // this.height = this.background.height
        // make sure background is set in the middle of the container
        this.background.anchor.set(0.5)
        this.background.x = this.width/2
        this.background.y = this.height/2
        this.addChild(this.background)
        // container does not have anchor? so set the x and y to middle of screen minus half of it's own width or height.
        this.x = window.innerWidth/2 - (this.scale.x/2)
        this.y = window.innerHeight/2 - (this.scale.y/2)

        this.rightPage = new SettingsPage('Instellingen',this.game, this.game.textStyle, uiElements)
        this.rightPage.x = 50
        this.rightPage.y = 5
        this.addChild(this.rightPage)
        }
}