import * as PIXI from 'pixi.js'

export class BookPage extends PIXI.Container {

    title: PIXI.Text
    titleStyle: PIXI.TextStyle


    constructor(name: string) {
        super()
        this.width = 361
        this.height = 608
        this.titleStyle = new PIXI.TextStyle({
            "dropShadow": true,
            "dropShadowAlpha": 0.2,
            "dropShadowBlur": 10,
            "fontFamily": "Courier New",
            "fontSize": 30,
            "fontStyle": "italic",
            "fontWeight": "bolder",
            "lineJoin": "bevel",
            "stroke": "white",
            "strokeThickness": 2,
            
        });
        this.title = new PIXI.Text(name, this.titleStyle)
        this.title.anchor.set(0.5,0)
        this.title.x = this.width / 2 + 125
        this.title.y = this.title.height - 250
        this.addChild(this.title)
    }
}
