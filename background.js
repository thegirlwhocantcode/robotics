//Class for all layers
export class layers {
    constructor(game, width, height, image, speedmodifier) {
        this.game = game
        this.x = 0;
        this.y = 0;
        this.width = width
        this.height = height
        this.x2 = this.width
        this.gamespeed = game.gamespeed
        this.image = image
        this.speedmodifier = speedmodifier
        this.speed = this.gamespeed * this.speedmodifier
    }

    update(input) {
        if (input.includes('ArrowRight') ||
            input.includes('ArrowLeft') ||
            input.includes('ArrowUp') ||
            input.includes('ArrowDown')) {
                this.gamespeed = 10
                this.speed = this.gamespeed * this.speedmodifier
            }   
        else
            this.speed = this.gamespeed = 0
        
        if (this.x <= -this.width) {
            this.x = this.width + this.x2 - this.speed
        }

        if (this.x2 < -this.width) {
            this.x2 = this.width + this.x - this.speed
        }
        this.x = Math.floor(this.x - this.speed)
        this.x2 =Math.floor(this.x2 - this.speed)
}
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.x2, this.y, this.width, this.height)
    }
}

export class background {
    constructor(game) {
        this.game = game
        this.width = game.width
        this.height = game.height
        this.layer1image = document.getElementById('layer-1')
        this.layer1 = new layers(game, game.width, game.height,this.layer1image, 0.2)
        this.layer2image = document.getElementById('layer-2')
        this.layer2 = new layers(game, game.width, game.height,this.layer2image, 0.4)
        this.layer3image = document.getElementById('layer-3')
        this.layer3 = new layers(game, game.width, game.height,this.layer3image, 0.6)
        this.layer4image = document.getElementById('layer-4')
        this.layer4 = new layers(game, game.width, game.height,this.layer4image, 0.8)
        this.layer5image = document.getElementById('layer-5')
        this.layer5 = new layers(game, game.width, game.height,this.layer5image, 1)
        this.backgroundlayers = [this.layer1,this.layer2, this.layer3 ,this.layer4, this.layer5]
    }

    update(input) {
        this.backgroundlayers.forEach(layer => {
            layer.update(input)
        })
    }

    draw(context) {
        this.backgroundlayers.forEach(layer => {
            layer.draw(context)
        })
    }
}