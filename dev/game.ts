class Game {

    // Fields
    private cars    : Car[]     = []
    private rocks   : Rock[]    = []
    private score   : number    = 0
    private request : number    = 0
    private gameover: boolean   = false


    constructor() {
        for(let i = 0 ; i < 6 ; i++) {
            this.addCarWithRock(i)
        }

        this.gameLoop()
    }

    private addCarWithRock(index : number) {
        this.cars.push(new Car(index, this))
        this.rocks.push(new Rock(index))
    }

    private gameLoop(){
        for(let car of this.cars){
            car.move()
        }
        for(let rock of this.rocks) {
            rock.move()
        }

        this.checkCollision()
        
        this.request = requestAnimationFrame(() => this.gameLoop())
    }

    private checkCollision() {
        for(let car of this.cars) {
            for(let rock of this.rocks) {
                if(this.hasCollision(car, rock)) {
                    rock.crashed(car.Speed)
                    car.crash()
                    this.gameOver()
                }
            }
        }
    }

    private gameOver() : void{
        this.gameover = true
        document.getElementById("score").innerHTML = "Game Over"
        cancelAnimationFrame(this.request)
    }

    public addScore(x : number){
        if(!this.gameover) {
            this.score += Math.floor(x)
            this.draw()
        }
    }

    private draw() {
        document.getElementById("score").innerHTML = "Score : "+this.score
    }

    private hasCollision(rect1 : Car, rect2 : Rock) : boolean {
        return (rect1.X < rect2.X + rect2.width &&
                rect1.X + rect1.width > rect2.X &&
                rect1.Y < rect2.Y + rect2.height &&
                rect1.Y + rect1.height > rect2.Y)
    }
} 

// load
window.addEventListener("load", () => new Game() )