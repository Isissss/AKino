import * as PIXI from 'pixi.js'

export class BookPage extends PIXI.Container{

    public title: PIXI.Text
    public style: PIXI.TextStyle


    constructor(name:string){
        super()
        this.width = 361
        this.height = 608
        this.style = new PIXI.TextStyle({
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
            "textBaseline": "middle"
        });
        this.title = new PIXI.Text(name, this.style)
        this.title.anchor.set(0,5)
        this.title.x = this.width/2
        this.title.y = this.title.height/2
        this.addChild(this.title)
        }
    }
