import * as PIXI from 'pixi.js'
import { BookPage } from './BookPage'
import { Button } from './Button'
import { EndButton } from './EndButton'
import { Game } from './game'
import { ResumeButton } from './ResumeButton'
import { StartButton } from './StartButton'

export class EndPage extends BookPage {

    name: string
    endButton: Button
    credits: PIXI.Text[] =[]
    names: string[] =['Gemaakt door:', 'Wessel van Beek', 'Pim van Milt', 'Jeffrey van Otterloo', 'Isis Ton']
    


    constructor(name: string, game: Game, textstyle: PIXI.TextStyle, uiTextures: PIXI.Texture[]) {
        super(name)
        this.name = name
        this.title.x = 170
        this.endButton = new EndButton(game, [uiTextures[10],uiTextures[11],uiTextures[11],uiTextures[11],uiTextures[12]], "Opnieuw Proberen" ,50, 0)
        this.endButton.scale.set(3)
        let i = 0
        for(const name of this.names) {
            const credit = new PIXI.Text(name, game.textStyle)
            credit.y = credit.height*i +90
            credit.scale.set(0.5)
            this.addChild(credit)
            this.credits.push(credit)
            i++
        }


        this.addChild(this.endButton)
    }

}