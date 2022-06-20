import * as PIXI from 'pixi.js'
import { Button } from './Button'
import { EndPage } from './EndPage'
import { Game } from './game'
import { SettingsPage } from './SettingsPage'
import { StartPage } from './StartPage'

export class Menu extends PIXI.Container {
    background: PIXI.Sprite
    game: Game
    rightPage: SettingsPage
    leftPage: PIXI.Container

    constructor(game: Game, backgroundTexture: PIXI.Texture, uiElements: PIXI.Texture[]) {
        super()
        this.game = game

        this.background = new PIXI.Sprite(backgroundTexture)
        this.background.scale.set(6)
        // set container's height and width to background's height and width.
        // this.width = this.background.width
        // this.height = this.background.height
        // make sure background is set in the middle of the container
        this.background.anchor.set(0.5)
        this.background.x = this.width / 2
        this.background.y = this.height / 2
        this.addChild(this.background)
        // container does not have anchor? so set the x and y to middle of screen minus half of it's own width or height.
        this.x = 0
        this.y = 0

        switch (this.game.state) {
            case 0: // if on the start screen, Left Page allows to start game
                this.leftPage = new StartPage("Start", this.game, this.game.textStyle, uiElements)
                break;
            case 1: // if in-game Left Page is a questlog
                this.leftPage = new SettingsPage("Questslog", this.game, this.game.textStyle, uiElements)
                break;
            case 2:
                this.leftPage = new EndPage("Game Finished", this.game, this.game.textStyle, uiElements)
                break;
            case 3:
                this.leftPage = new EndPage("Game Over", this.game, this.game.textStyle, uiElements)
                break;

            default: // on End and Game Over screen, left page allows to restart game, and shows score
            this.leftPage = new StartPage("CRITICAL ERROR", this.game, this.game.textStyle, uiElements)
                break;
        }


        this.rightPage = new SettingsPage('Instellingen', this.game, this.game.textStyle, uiElements)
        this.rightPage.x = 50
        this.rightPage.y = 5
        this.leftPage.x = -350
        this.leftPage.y = 5
        this.addChild(this.leftPage,this.rightPage)
    }
}