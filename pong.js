const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// Configurações do jogo
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 10;

// Raquetes
let paddle1Y = (canvas.height - PADDLE_HEIGHT) / 2;
let paddle2Y = (canvas.height - PADDLE_HEIGHT) / 2;
const paddleSpeed = 5;
const ballSpeed = 4;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = ballSpeed;
let ballSpeedY = ballSpeed;

let score1 = 0;
let score2 = 0;

// Função para desenhar a raquete
function drawPaddle(x, y) {
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT);
}

// Função para desenhar a bolinha
function drawBall() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ballX, ballY, BALL_SIZE, 0, Math.PI * 2);
    ctx.fill();
}

// Função para desenhar o placar
function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillText(`${score1} : ${score2}`, canvas.width / 2 - 50, 30);
}

// Função de movimentação da bolinha
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Colisão com as paredes superior e inferior
    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Colisão com as raquetes
    if (ballX <= PADDLE_WIDTH && ballY >= paddle1Y && ballY <= paddle1Y + PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX >= canvas.width - PADDLE_WIDTH - BALL_SIZE && ballY >= paddle2Y && ballY <= paddle2Y + PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;
    }

    // Pontuação
    if (ballX <= 0) {
        score2++;
        resetBall();
    } else if (ballX >= canvas.width) {
        score1++;
        resetBall();
    }
}

// Função para resetar a bolinha
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = ballSpeed;
}

// Função para movimentar as raquetes
function movePaddles() {
    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowUp" && paddle2Y > 0) {
            paddle2Y -= paddleSpeed;
        }
        if (event.key === "ArrowDown" && paddle2Y < canvas.height - PADDLE_HEIGHT) {
            paddle2Y += paddleSpeed;
        }
        if (event.key === "w" && paddle1Y > 0) {
            paddle1Y -= paddleSpeed;
        }
        if (event.key === "s" && paddle1Y < canvas.height - PADDLE_HEIGHT) {
            paddle1Y += paddleSpeed;
        }
    });
}

// Função para atualizar o jogo
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(0, paddle1Y);
    drawPaddle(canvas.width - PADDLE_WIDTH, paddle2Y);
    drawBall();
    drawScore();
    moveBall();
}

// Função principal que roda o jogo
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

movePaddles();
gameLoop();
