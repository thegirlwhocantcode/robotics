//Initialize
/** @type {HTMLCanvasElement} */
const infoDisplay = document.querySelector('#info')
const scoredisplay = document.querySelector('#score')
infoDisplay.textContent = "Are you increasing or decreasing methane?"
//adding a comment

//animate init
const canvas = document.getElementById('Biome1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 1500
const CANVAS_HEIGHT = canvas.height = 700
let gamespeed = 10
let x = 0
let x2 = 2400

//sprite
const spriteWidth = 575
const spriteHeight = 523
let FrameX = 0
let FrameY = 0
let gameFrame = 0
let staggerFrames = 5

const Leo = new Image()
Leo.src = 'shadow_dog.png'



let score = 100
scoredisplay.textContent = "Your score is:" + score

//enemies
const numberofEnemies = 30
const enemiesArray = []

//background images
const backgroundlayer1 = new Image()
backgroundlayer1.src = 'layer-1.png'
const backgroundlayer2 = new Image()
backgroundlayer2.src = 'layer-2.png'
const backgroundlayer3 = new Image()
backgroundlayer3.src = 'layer-3.png'
const backgroundlayer4 = new Image()
backgroundlayer4.src = 'layer-4.png'
const backgroundlayer5 = new Image()
backgroundlayer5.src = 'layer-5.png'
const backgroundImage = new Image()

//Class for background layers
class Layer {
    constructor(image, speedmodifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.x2 = this.width
        this.image = image
        this.speedmodifier = speedmodifier
        this.speed = gamespeed * this.speedmodifier
    }

    update() {
        this.speed = gamespeed * this.speedmodifier
        if (this.x <= -this.width) {
            this.x = this.width + this.x2 - this.speed
        }

        if (this.x2 < -this.width) {
            this.x2 = this.width + this.x - this.speed
        }
        this.x = Math.floor(this.x - this.speed)
        this.x2 =Math.floor(this.x2 - this.speed)
}
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height)
    }
}

//Class for enemy objects
class Enemy {
    constructor() {
        this.image = new Image()
        this.image.src = 'enemy1.jpeg'
        this.width = 100
        this.height = 100
        this.x = Math.random() * canvas.width
        this.y = Math.random() * (canvas.height)
        this.speed = Math.random() * 8 - 2.5
    }
    update() {
        if (this.x < 0) this.x = 0
        if (this.x > CANVAS_WIDTH - this.width) this.x =  CANVAS_WIDTH - this.width
        this.y ++
        if (this.y < 0) this.y = 0
        if (this.y > CANVAS_HEIGHT - this.height) this.y =  this.height
    }
    draw() {
        ctx.fillRect(this.x, this.y, this.width, this.height)
        //ctx.drawImage(this.image, this.x, this.y, 100, 100)
    }
}
//background with arguments for image and speedmodifier. It calls construct in class
const layer1 = new Layer(backgroundlayer1, 0.2)
const layer2 = new Layer(backgroundlayer2, 0.4)
const layer3 = new Layer(backgroundlayer3, 0.6)
const layer4 = new Layer(backgroundlayer4, 0.8)
const layer5 = new Layer(backgroundlayer5, 1)


//Functions
function IdleAnimate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(Leo, FrameX * spriteWidth , FrameY * spriteHeight, spriteWidth, spriteHeight, 0, 500, 100, 100)
    if (gameFrame % staggerFrames == 0) {
        if (FrameX < 6) FrameX++
        else FrameX = 0
    }
    gameFrame++
    requestAnimationFrame(IdleAnimate)
}

function JumpAnimate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    FrameY = 1
    ctx.drawImage(Leo, FrameX * spriteWidth , FrameY * spriteHeight, spriteWidth, spriteHeight, 0, 500, 100, 100)
    if (gameFrame % staggerFrames == 0) {
        if (FrameX < 6) FrameX++
        else FrameX = 0
    }
    gameFrame++
    requestAnimationFrame(JumpAnimate)
}

function backgroundanimate() {
    //clear canvas and draw the image with the required speed
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    layer1.update()
    layer1.draw()
    layer2.update()
    layer2.draw()
    layer3.update()
    layer3.draw()
    layer4.update()
    layer4.draw()
    layer5.update()
    layer5.draw()
    requestAnimationFrame(backgroundanimate)
}

function enemyAnimate() {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
    enemiesArray.forEach(enemy => {
        enemy.update()
        enemy.draw()
    })

//    ctx.fillRect(enemy1.x, enemy1.y, enemy1.width, enemy1.height)
//    ctx.fillRect(enemy2.x, enemy2.y, enemy2.width, enemy2.height)
    requestAnimationFrame(enemyAnimate)
}

function addGo(e) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    keepScore(go)
    go = go === "tree" ? "septictank" : "tree"
    e.target.removeEventListener('click', addGo)
}

function keepScore(go) {
    score += go === "tree" ? 100 : -50
    infoDisplay.textContent = "Your score is " + score
}

function animate()
{
    backgroundanimate()
    for (let i = 0; i< numberofEnemies; i++) {
        enemiesArray.push(new Enemy())
    }
    enemyAnimate()
    //IdleAnimate()
    JumpAnimate()
}


//Program Start
animate()

