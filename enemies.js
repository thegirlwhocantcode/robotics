//Class for enemy objects
export class enemy {
    constructor(game) {
        this.image = document.getElementById('enemy1')
        this.width = 60
        this.height = 60
        this.CANVAS_WIDTH = game.width
        this.CANVAS_HEIGHT = game.height
        this.x = Math.random() * game.width
        this.y = Math.random() * (game.height)
        this.speed = Math.random() * 8 - 2.5
        
    }
    update() {
        if (this.x < 0) this.x = 0
        if (this.x > this.CANVAS_WIDTH - this.width) this.x =  this.CANVAS_WIDTH - this.width
        this.y ++
        if (this.y < 0) this.y = this.height
        if (this.y > this.CANVAS_HEIGHT - this.height) this.y =  this.height
    }
    draw(context) {
        //context.fillRect(this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.x, this.y, 100, 100)
    }
}

export class enemies {
    constructor(game) {
        this.enemiesArray = []
        this.game = game
        this.numberofEnemies = game.numberofEnemies
        console.log(this.numberofEnemies)
        for (let i = 0; i< this.numberofEnemies; i++) {
            this.enemiesArray.push(new enemy(game))
        }
        console.log(this.enemiesArray)
    }
    update() {
        this.enemiesArray.forEach(enemy_army => {
            enemy_army.update()
        });
    }
    draw(context) {
        this.enemiesArray.forEach(enemy_army => {
            enemy_army.draw(context)
        })
    }

}

 