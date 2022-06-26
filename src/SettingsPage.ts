import * as PIXI from 'pixi.js'
import { BookPage } from './BookPage'
import { FontSizeSlider } from './FontSizeSlider'
import { Game } from './game'
import { Slider } from './Slider'
import { VolumeSlider } from  './VolumeSlider'

export class SettingsPage extends BookPage {

    public name: string //child of PIXI.Container
    private SoundFXSlider: Slider
    private bgMusicSlider: Slider
    private fontSizeSlider: Slider


    constructor(name: string, game: Game, textstyle: PIXI.TextStyle, uiTextures: PIXI.Texture[]) {
        super(name)
        this.name = name
        this.SoundFXSlider = new VolumeSlider(game, "Geluidseffecten", game.soundFXVolume, 5, uiTextures)
        this.bgMusicSlider = new VolumeSlider(game, "Achtergrondmuziek", game.bgMusicVolume, 5, uiTextures)
        this.fontSizeSlider = new FontSizeSlider(game, "Lettergrootte", game.fontSize, 1, uiTextures)
        this.bgMusicSlider.y = this.bgMusicSlider.height + 5
        this.fontSizeSlider.y = this.bgMusicSlider.y + this.bgMusicSlider.height + 5
        this.addChild(this.SoundFXSlider, this.bgMusicSlider, this.fontSizeSlider)
    }

}