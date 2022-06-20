import * as PIXI from 'pixi.js'
import { Button } from './Button';
import { Game } from './game';


export class StartButton extends Button {
    
    game: Game
    text: PIXI.Text

    constructor(game: Game, textures: PIXI.Texture[], name:string, x:number = 0, y:number = 0) {
        super(game, textures, x, y)
       
        this.text = new PIXI.Text(name, this.game.textStyle)
        this.text.scale.set(0.3)
        this.text.x = this.width/2 - this.text.width/2
        this.text.y = this.height/2 - this.text.height/2

        this.addChild(this.text)
    }

    public buttonClicked() {
       this.game.state = 1;
       this.game.startscreen.visible = false;
       this.game.menuActive = false;
       this.game.ui.visible = true;
    }
}