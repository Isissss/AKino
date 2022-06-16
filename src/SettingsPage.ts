import * as PIXI from 'pixi.js'
import { BookPage } from './BookPage'
import { Game } from './game'
import { Slider } from './Slider'

export class SettingsPage extends BookPage {

    name: string
    SoundFXSlider: Slider
    bgMusicSlider: Slider
    fontSizeSlider: Slider


    constructor(name: string, game: Game, textstyle: PIXI.TextStyle, uiTextures: PIXI.Texture[]) {
        super(name)
        this.name = name
        //console.log(uiTextures)
        this.SoundFXSlider = new Slider(game, "Geluidseffecten", 5, game.soundFX, uiTextures)
        this.bgMusicSlider = new Slider(game, "Achtergrondmuziek", 5, game.bgMusic, uiTextures)
        this.fontSizeSlider = new Slider(game, "Lettergrootte", 1, game.fontSize, uiTextures)
        this.bgMusicSlider.y = this.bgMusicSlider.height + 5
        this.fontSizeSlider.y = this.bgMusicSlider.y + this.bgMusicSlider.height + 5
        this.addChild(this.SoundFXSlider, this.bgMusicSlider, this.fontSizeSlider)
    }

}