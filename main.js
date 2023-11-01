import { Player } from './player.js'
import { InputHandler } from './input.js'
import { background } from './background.js'
import { SepticTank, Animals, Pollution } from './enemy.js'
//import { enemies } from './enemies.js'

window.addEventListener('load', function(){
const canvas = document.getElementById('Biome1')
const infoDisplay = this.document.querySelector('#info')
let gameScore = this.document.querySelector('#score')
infoDisplay.textContent = "Are you increasing or decreasing methane?"
gameScore.textContent = "Score is:"
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 1500
const CANVAS_HEIGHT = canvas.height = 700
let deltaTime = 0
let gamespeed = 0
let numberofEnemies = 20


    class Game {
        constructor(width, height) {
            this.width = width
            this.height = height
            this.gamespeed = gamespeed
            this.debug  = false
            this.numberofEnemies = numberofEnemies
            this.background = new background(this)
            //this.enemyArray = new enemies(this)
            this.Player = new Player(this)
            this.input = new InputHandler(this)
            this.enemies = []
            this.enemyTimer = 0
            this.enemyInterval = 500
            this.score = 0
        }

        update(deltaTime) {
            this.background.update(this.input.keys)
            //this.enemyArray.update()
            this.Player.update(this.input.keys)
            if (this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0
            }
            else 
                this.enemyTimer += deltaTime
                
            this.enemies.forEach(enemy => { 
                enemy.update(deltaTime)
                if (enemy.markedforDeletion == true)
                    this.enemies.splice(this.enemies.indexOf(enemy), 1)
            })
        }

        draw(context) {
            this.background.draw(context)
            //this.enemyArray.draw(context)
            this.Player.draw(context)
            this.enemies.forEach(enemy => {
                enemy.draw(context)
            })
        }

        addEnemy() {
            if (Math.random() < 0.5) this.enemies.push(new Animals(this))
            else {
            this.enemies.push(new Pollution(this))
            this.enemies.push(new SepticTank(this))
            //console.log(this.enemies)
            }
        }
    }

    const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT)

    function animate() {
        gameScore.textContent = "Score is: " + game.score
        if (game.score < 100) {
            deltaTime = 10
        } else {
            deltaTime = 20
        }
        ctx.clearRect(0,0,canvas.width, canvas.height)
        game.update(deltaTime)
        game.draw(ctx)
        requestAnimationFrame(animate)
    }

    animate()

})