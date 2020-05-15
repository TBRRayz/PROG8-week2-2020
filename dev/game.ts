/// <reference path="car.ts"/>

class Game {

    private static _instance : Game;

    private cars  : Array<Car>;
    private rocks : Array<Rock>;
    private score : number = 0;
    private request: number = 0;
    private _gameOver: boolean = false;

    public static instance() : Game {
        if(!Game._instance) Game._instance = new Game();
        return Game._instance;
    }

    private constructor() {
        this.cars = new Array<Car>();
        this.rocks = new Array<Rock>();

        for(let i = 0; i < 6 ; i++) {
            this.addCarWithRock(i);
        }

        this.request = requestAnimationFrame(() => this.gameLoop());
    }

    private addCarWithRock(index : number) {
        this.cars.push(new Car(index));
        this.rocks.push(new Rock(index));

    }

    private gameLoop(){

        for(let car of this.cars){
            car.move();
        }
        for(let rock of this.rocks) {
            rock.move();
        }

        this.checkCollision();
        console.log("hier");
        
        this.request = requestAnimationFrame(() => this.gameLoop());
    }

    private checkCollision() {
        for(let car of this.cars) {
            for(let rock of this.rocks) {
                if(car.hasCollision(rock)) {
                    rock.crashed(car.speed);
                    car.stop();
                    this.gameOver();
                    //this.stop();
                }
            }
        }
    }

    // private stop() {
    //     cancelAnimationFrame(this.request);
    // }
    private gameOver() : void{
        this._gameOver = true;
        document.getElementById("score").innerHTML = "Game Over";
    }

    public addScore(x : number){
        if(!this._gameOver) {
            this.score += Math.floor(x);
            this.draw();
        }
    }

    private draw() {
        document.getElementById("score").innerHTML = "Score : "+this.score;
    }
} 


// load
window.addEventListener("load", function() {
    Game.instance();
});