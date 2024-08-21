const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = 1080;
const canvasHeight = 400;
const gridSize = 20;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const tileCountX = Math.floor(canvasWidth / gridSize);
const tileCountY = Math.floor(canvasHeight / gridSize);

let snake = [{ x: 10 * gridSize, y: 10 * gridSize }];
let direction = 'RIGHT';
let food = { x: 5 * gridSize, y: 5 * gridSize };
let score = 0;
let gameInterval;
let gameStarted = false;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = '#003366';
    ctx.strokeStyle = '#003366';
    ctx.lineWidth = 2;
    for (const segment of snake) {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
        ctx.strokeRect(segment.x, segment.y, gridSize, gridSize);
    }

    // Draw the food
    ctx.fillStyle = '#FFEB3B ';
    ctx.strokeStyle = '#FFEB3B';
    ctx.lineWidth = 2;
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
    ctx.strokeRect(food.x, food.y, gridSize, gridSize);

    // Draw the score
    ctx.fillStyle = '#333333';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, canvas.height - 10);
}

function update() {
    const head = { ...snake[0] };

    switch (direction) {
        case 'UP':
            head.y -= gridSize;
            break;
        case 'DOWN':
            head.y += gridSize;
            break;
        case 'LEFT':
            head.x -= gridSize;
            break;
        case 'RIGHT':
            head.x += gridSize;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collision()) {
        resetGame();
    }

    draw();
}

function collision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function placeFood() {
    const x = Math.floor(Math.random() * tileCountX) * gridSize;
    const y = Math.floor(Math.random() * tileCountY) * gridSize;
    food = { x, y };
}

function resetGame() {
    clearInterval(gameInterval);
    snake = [{ x: 10 * gridSize, y: 10 * gridSize }];
    direction = 'RIGHT';
    score = 0;
    placeFood();
    gameStarted = false;
    document.getElementById('startButton').classList.remove('hidden');
}

function changeDirection(event) {
    event.preventDefault(); // Evita el scroll de la página
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'DOWN') direction = 'UP';
            break;
        case 'ArrowDown':
            if (direction !== 'UP') direction = 'DOWN';
            break;
        case 'ArrowLeft':
            if (direction !== 'RIGHT') direction = 'LEFT';
            break;
        case 'ArrowRight':
            if (direction !== 'LEFT') direction = 'RIGHT';
            break;
    }
}

function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    document.getElementById('startButton').classList.add('hidden');
    gameInterval = setInterval(update, 200);
}

document.getElementById('startButton').addEventListener('click', startGame);
document.addEventListener('keydown', changeDirection);
