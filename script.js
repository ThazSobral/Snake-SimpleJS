const scoreboard = document.getElementById('score')
const canvas = document.getElementById('snake')
const context = canvas.getContext('2d')
const box = 16
const backgroundX = 32 * box, backgroundY = 32 * box

let score = 0
let direction = null
let snake = []
snake[0] ={
    x: box * box,
    y: box * box
}

let snakeX = snake[0].x, snakeY = snake[0].y

let food ={
    x: Math.floor(Math.random() * (box-1) + 1) * (box * 2),
    y: Math.floor(Math.random() * (box-1) + 1) * (box * 2)
}

const createBackground = () => {
    context.fillStyle = "black"
    context.fillRect(0, 0, backgroundX, backgroundY)
}

const createSnake = () => {
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "white"
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

const drawFood = () => {
    context.fillStyle = "yellow"
    context.fillRect(food.x, food.y, box, box)
}

const update = (event) => {
    if(event.keyCode == 37 && direction != 'right') direction = 'left'
    if(event.keyCode == 38 && direction != 'down') direction = 'up'
    if(event.keyCode == 39 && direction != 'left') direction = 'right'
    if(event.keyCode == 40 && direction != 'up') direction = 'down'
}

const limit = () => {
    if(snake[0].x >= backgroundX && direction == "right") snake[0].x = -box
    if(snake[0].x < 0 && direction == 'left') snake[0].x = backgroundX
    if(snake[0].y >= backgroundY && direction == "down") snake[0].y = -box
    if(snake[0].y < 0 && direction == 'up') snake[0].y = backgroundY
}

const gameOver = () => {
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game)
            alert('Game Over!')
        }
    }
}

const moveSnake = () => {
    snakeX = snake[0].x
    snakeY = snake[0].y

    if(direction == "right") snakeX += box
    if(direction == "left") snakeX -= box
    if (direction == "up") snakeY -= box
    if(direction == "down") snakeY += box
}

const updateSnake = () => {
    if(snakeX != food.x || snakeY != food.y){
        snake.pop()
    }else{
        food.x = Math.floor(Math.random() * (box-1) + 1) * box
        food.y = Math.floor(Math.random() * (box-1) + 1) * box
        updateScore()
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)
}

const updateScore = () => {
    score += 1
    scoreboard.innerHTML = ''
    const textScore = document.createTextNode(score)
    
    scoreboard.appendChild(textScore)
}

const startGame = () => {    
    createBackground()
    createSnake()
    drawFood()
    
    limit()
    gameOver()
    
    moveSnake()
    updateSnake()

}

document.addEventListener('keydown', update)

let game = setInterval(startGame, 100)