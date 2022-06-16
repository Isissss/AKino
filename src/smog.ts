import * as PIXI from 'pixi.js'
import { InteractionData } from 'pixi.js'


export class Smog extends PIXI.Graphics{

    xPos:number
    yPos:number
    radius:number
    


    constructor(x:number, y:number, radius:number){
        super()
        this.xPos = x
        this.yPos = y
        this.radius = radius
        this.interactive = true
        this.draw()       
    }

    private draw() {
        this.beginFill(0xffffff)
        this.drawCircle(this.xPos,this.yPos,this.radius)
        this.endFill

    }

    public update(){
        if(this.radius >= 1) {
        this.radius -= 0.1
        this.clear()
        this.draw()
        console.log(`radius: ${this.radius}`)
        }
        else{
            console.log(`radius is already 0`)
            console.log('resetting circle to 200 radius')
            this.radius = 200
            this.clear()
            this.draw()
        }
    }
}