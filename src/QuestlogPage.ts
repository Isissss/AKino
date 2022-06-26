import * as PIXI from 'pixi.js'
import { BookPage } from './BookPage'
import { Game } from './game'
import { Slider } from './Slider'

export class QuestlogPage extends BookPage {

    public name: string // name must be public in children from PIXI.Container
    private text: PIXI.Text

    constructor(name: string, game: Game, textstyle: PIXI.TextStyle, uiTextures: PIXI.Texture[]) {
        super(name)
        this.name = name
        this.text = new PIXI.Text(
            `Hier zouden Quests \nkomen te staan,\nals we die hadden. \nHuidige Score: ${game.score.toString()}`,
            textstyle
        )        
        this.addChild(this.text)
    }

}