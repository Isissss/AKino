import * as PIXI from 'pixi.js'
import { BookPage } from './BookPage'
import { Button } from './Button'
import { Game } from './game'

export class StartPage extends BookPage {

    name: string
    startButton: Button
    resumeButton: Button
    


    constructor(name: string, game: Game, textstyle: PIXI.TextStyle, uiTextures: PIXI.Texture[]) {
        super(name)
        this.name = name
        this.title.x = 170
        //console.log(uiTextures)
        this.startButton = new Button (game, [uiTextures[7],uiTextures[8],uiTextures[9]], 100, 0)
        this.startButton.scale.set(3)
        this.resumeButton = new Button (game, [uiTextures[4],uiTextures[5],uiTextures[6]], 100, 60)
        this.resumeButton.scale.set(3)

        this.addChild(this.startButton, this.resumeButton)
    }

}