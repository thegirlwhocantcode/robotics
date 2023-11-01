import { SepticTank, Animals, Pollution } from './enemy.js'

export class Player {
    constructor(game) {
        this.image = document.getElementById('player') 
        this.game = game
        this.width = 100
        this.height = 91.3   
        this.FrameX = 0
        this.FrameY = this.game.height - this.height -110
        this.vel = 0
        this.weight = 1
        this.speed = this.game.gamespeed
        this.maxspeed = 10
    }
    update(input) {
        this.Collision()

        //horizontal movement
        this.FrameX += this.speed
        if (input.includes('ArrowRight')) this.speed = this.maxspeed
        else if (input.includes('ArrowLeft')) this.speed = -this.maxspeed
        else this.speed = 0
        if (this.FrameX < 0) this.FrameX = 0
        if (this.FrameX > this.game.width - this.width) this.FrameX = this.game.width - this.width

        //vertical movement
        if (input.includes('ArrowUp') && this.onGround())  this.vel -= 30
        this.FrameY += this.vel
        
        if (!this.onGround())  { this.vel += this.weight
        }
        else { this.vel = 0
        }
    
    }
    draw(context) {
        //context.fillStyle = 'green'
        //context.fillRect(this.FrameX, this.FrameY, this.width, this.height)
        
        if (this.game.debug) context.strokeRect(this.FrameX, this.FrameY, this.width, this.height) 
        //context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
        context.drawImage(this.image, 0, 100, this.width, this.height ,this.FrameX , this.FrameY, this.width, this.height)

    }

    onGround() {
        return this.FrameY >= this.game.height - this.height - 100
    }

    Collision() {
        this.game.enemies.forEach(enemy => {
            if (enemy.x < this.FrameX + this.width && 
                enemy.x + enemy.width > this.FrameX &&
                enemy.y < this.FrameY + this.height &&
                enemy.y + enemy.height > this.FrameY) {
                    enemy.markedforDeletion = true
                    if (enemy instanceof SepticTank || enemy instanceof Pollution) {
                        this.game.score += 10    
                    }
                    else if (enemy instanceof Animals) {
                        this.game.score -= 10
                    }
                    

            }
            
        });
    }
}