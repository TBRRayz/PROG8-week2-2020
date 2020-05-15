/// <reference path="wheel.ts"/>

class Car extends HTMLElement {
    // Fields
    private game    : Game
    private x       : number    = 0
    private y       : number    = 0
    private speed   : number    = Math.random() * 2 + 1
    private braking : boolean   = false
    private stopped : boolean   = false

    // Properties
    public get Speed()  : number    { return this.speed }

	public get X()      : number    { return this.x    }
	public set X(value  : number)   { this.x = value   }

	public get Y()      : number    { return this.y    }
	public set Y(value  : number)   { this.y = value   }


    public get width()  : number    { return this.clientWidth }
    public get height() : number    { return this.clientHeight }

    constructor(yIndex : number, game : Game) {
        super()

        this.game   = game
        this.X      = 0
        this.Y      = (70 * yIndex) + 80
        
        new Wheel(this, 105)  // front wheel 
        new Wheel(this, 20)   // rear wheel 

        // hier een keypress event listener toevoegen. een keypress zorgt dat braking true wordt
        document.addEventListener("keydown", (e : KeyboardEvent) => this.handleKeyDown(e))
        this.addEventListener("click", (e : MouseEvent) => this.handleMouseClick(e))

        let parent: HTMLElement = document.getElementById("container")
        parent.appendChild(this)
    }

    private handleMouseClick(e:MouseEvent) {
        this.braking = true
        this.changeColor(80) //green
    }

    private handleKeyDown(e : KeyboardEvent) {
        if(e.key == ' ') { // spacebar
            // Brake
            this.braking = true
        }
    }

    public move():void {
        // de snelheid bij de x waarde optellen
        this.X += this.speed

        // hier de snelheid verlagen als we aan het afremmen zijn
        if (this.braking)       this.speed *= 0.98
        if (this.speed < 0.5)   this.speed = 0
        
        if(this.speed == 0 && this.braking && !this.stopped) {
            this.changeColor(80) //green
            this.game.addScore(this.X)
            this.braking = false
            this.stopped = true
        }
        this.draw()
    } 

    public crash() {
        this.speed = 0
        this.braking = false
        this.changeColor(300) //red
    }

    public changeColor(deg : number) : void {
        this.style.filter = `hue-rotate(${deg}deg)`
    }

    private draw() : void {
        this.style.transform =`translate(${this.X}px,${this.Y}px)`
    }
}

window.customElements.define("car-component", Car as any)