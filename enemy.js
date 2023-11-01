class baseenemy {
    constructor() {
        this.width = 60
        this.height = 60
        this.fps = 10
        this.frameInterval = 10000/this.fps
        this.frameTimer = 0
        this.markforDeletion = false
    }

    update(deltaTime) {
        this.x -= Math.random() * this.speedX
        this.y += this.speedY
        if (this.frameTimer > this.frameInterval)
            this.frameTimer = 0 
        else
            this.frameTimer += deltaTime
        if (this.x +this.width < 0)
            this.markforDeletion = true

    }

    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}


export class SepticTank extends baseenemy {
    constructor(game) {
        super();
        this.game = game
        this.x = this.game.width - 60
        this.y = Math.random() * this.game.height * 0.5
        this.image = document.getElementById('enemy1')
        this.speedX = 5
        this.speedY = 0
    }

    update(deltaTime) {
        super.update(deltaTime)
    }

    draw(context) {
        super.draw(context)
    }
}

 export class Animals extends baseenemy {
    constructor(game) {
        super()
        this.game = game
        this.image = document.getElementById('enemy2')
        this.speedX = 4
        this.speedY = 0
        this.x = Math.random() * this.game.width - 60
        this.y = this.game.height - 60 - 110
    }

    update(deltaTime) {
        super.update(deltaTime)
    }

    draw(context) {
        super.draw(context)
    }
}

export class Pollution extends baseenemy {
    constructor(game) {
        super()
        this.game = game
        this.image = document.getElementById('enemy3')
        this.speedX = 6
        this.speedY = 6
        this.x = Math.random() * this.game.width
        this.y = 50
    }

    update(deltaTime) {
        super.update(deltaTime)
    }

    draw(context) {
        super.draw(context)
    }
}