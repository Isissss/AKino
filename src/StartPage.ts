import * as PIXI from 'pixi.js'
import { BookPage } from './BookPage'
import { Button } from './Button'
import { Game } from './game'
import { ResumeButton } from './ResumeButton'
import { StartButton } from './StartButton'

export class StartPage extends BookPage {

    name: string
    startButton: Button
    resumeButton: Button
    


    constructor(name: string, game: Game, textstyle: PIXI.TextStyle, uiTextures: PIXI.Texture[]) {
        super(name)
        this.name = name
        this.title.x = 170
        //console.log(uiTextures)
        this.startButton = new StartButton (game, [uiTextures[7],uiTextures[8],uiTextures[8],uiTextures[8],uiTextures[9]], "Spel Starten" ,50, 0)
        this.startButton.scale.set(3)
        this.resumeButton = new ResumeButton (game, [uiTextures[4],uiTextures[5],uiTextures[5],uiTextures[5],uiTextures[6]], "Spel Hervatten" ,50, 60)
        this.resumeButton.scale.set(3)

        this.addChild(this.startButton, this.resumeButton)
    }

}