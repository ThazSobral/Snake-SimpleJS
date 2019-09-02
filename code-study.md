>>HTML
```
  <link rel="stylesheet" href="./style.css ">
```
link para o arquivo style
```
  <canvas id="snake" width="512" height="512"></canvas>
```
marcação do canvas (tela) determinando id largura e altura
```
  <script src="./script.js"></script>
```
script do game

>>JS
```
let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
```
define o contexto do canvas como 2d
```
let box = 32
```
define o tamanho do retângulo em pixels
```
let snake = []
snake[0] ={
    x: 8 * box,
    y: 8 * box
}
```
define o corpo da cobrinha
```
let direction = null
```
define a direção padrão como null
```
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
```
define a posição da comida
*Math.floor() retorna o maior número inteiro
*Math.random() gera um número randômico
```
function criarBG(){
    context.fillStyle = 'black'
    context.fillRect(0, 0, 16*box, 16*box)
}
```
renderiza o fundo
*ctx.fillStyle = cor
*ctx.fillRect ( x atual , y atual, largura , altura )
```
function criarCobrinha (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "white"
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}
```
renderiza a cobrinha quadrado por quadrado
```
function drawFood (){
    context.fillStyle = 'yellow'
    context.fillRect(food.x, food.y, box, box)
}
```
renderiza a comida
```
context.addEventListener('keydown', update)
*addEventListener(evento desejado/ parâmetro, ação a ser executada)
```
recebe o evento de listener da entrada do teclado como parâmetro chamando a função update
*document.event
```
function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left'
    if(event.keyCode == 38 && direction != 'down') direction = 'up'
    if(event.keyCode == 39 && direction != 'left') direction = 'right'
    if(event.keyCode == 40 && direction != 'up') direction = 'down'
}
```
atualiza o sentido do movimento
*event.keyCode == código pressionado && direction != oposta
```
function iniciarJogo(){    

    if(snake[0].x > 15*box && direction == 'right') snake[0].x = 0
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box
    if(snake[0].y > 15*box && direction == 'down') snake[0].y = 0
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box
```
faz com que a cobrinha se transporte para o lado oposto da tela
* snake[0].eixo > limite da tela && direction == ao lado da tela
* 0 é extremo esquerda e extremo cima
```    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo)
            alert('Game Over :(')
        }
    }
```
se a cobrinha a cobrinha encostar no próprio corpo chama o alert
```
    criarBG()
    criarCobrinha()
    drawFood()
```
chama as funções para renderização
```
    let snakeX = snake[0].x
    let snakeY = snake[0].y
```
posição do ponto de partida da cobrinha para cada renderização
```
    if(direction == 'right') snakeX += box
    if(direction == 'left') snakeX -= box
    if (direction == 'up') snakeY -= box
    if(direction == 'down') snakeY += box
```
dá o movimento para a cobrinha
*se a direção for a desejada aumenta ou diminui no plano cartesiano (x/y)
```
    if(snakeX != food.x || snakeY != food.y){
        snake.pop()
```
se não for igual x e/ ou y retira o ultimo retângulo
```
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box
        food.y = Math.floor(Math.random() * 15 +1) * box
    }
```
se não aumenta mais um retângulo
``` 
    let newHead ={
        x: snakeX,
        y: snakeY
    }
```
define a cabeça do cobrinha
```
    snake.unshift(newHead)
}
```
diciona mais elementos ao início do array
```
let jogo = setInterval(iniciarJogo, 100)
```
define um intervalo para renderizar a cada 100ms