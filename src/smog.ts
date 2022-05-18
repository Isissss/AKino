import * as PIXI from 'pixi.js'


export class Smog{

    x:number
    y:number
    radius:number
    


    constructor(x:number, y:number, radius:number){
        this.x = x
        this.y = y
        this.radius = radius
        
    }

    update() {
        this.radius --
    }



}