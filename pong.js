const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let paddleHeight = 100;
let paddleWidth = 15;
let ballSize = 10;

let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;

let player1Score = 0;
let player2Score = 0;
const winScore = 10;
let gameOver = false;

document.addEventListener("keydown", movePaddles);

function movePaddles(e) {
  const speed = 20;
  if (e.key === "w" && player1Y > 0) player1Y -= speed;
  if (e.key === "s" && player1Y < canvas.height - paddleHeight) player1Y += speed;
  if (e.key === "ArrowUp" && player2Y > 0) player2Y -= speed;
  if (e.key === "ArrowDown" && player2Y < canvas.height - paddleHeight) player2Y += speed;
}

function drawRect(x, y, w, h, color = "white") {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawBall(x, y) {
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, ballSize, ballSize);
}

function drawText(text, x, y, size = "30px", color = "white") {
  ctx.fillStyle = color;
  ctx.font = `${size} monospace`;
  ctx.fillText(text, x, y);
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX *= -1;
  ballSpeedY = (Math.random() * 4) - 2;
}

function checkVictory() {
  if (player1Score >= winScore || player2Score >= winScore) {
    gameOver = true;
    document.getElementById("victory").style.display = "block";
    document.getElementById("victory").innerText = player1Score > player2Score ? "🏆 Jogador 1 venceu!" : "🏆 Jogador 2 venceu!";
  }
}

function drawGame() {
  if (gameOver) return;

  // Movimento da bolinha
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Colisão topo/fundo
  if (ballY <= 0 || ballY + ballSize >= canvas.height) {
    ballSpeedY *= -1;
  }

  // Colisão com raquete esquerda
  if (
    ballX <= paddleWidth &&
    ballY + ballSize >= player1Y &&
    ballY <= player1Y + paddleHeight
  ) {
    ballSpeedX *= -1;
  }

  // Colisão com raquete direita
  if (
    ballX + ballSize >= canvas.width - paddleWidth &&
    ballY + ballSize >= player2Y &&
    ballY <= player2Y + paddleHeight
  ) {
    ballSpeedX *= -1;
  }

  // Pontuação
  if (ballX <= 0) {
    player2Score++;
    resetBall();
    checkVictory();
  }

  if (ballX + ballSize >= canvas.width) {
    player1Score++;
    resetBall();
    checkVictory();
  }

  // Limpa tela
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha elementos
  drawRect(0, player1Y, paddleWidth, paddleHeight); // Raquete 1
  drawRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight); // Raquete 2
  drawBall(ballX, ballY); // Bolinha

  // Placar
  drawText(`${player1Score}`, canvas.width / 4, 50);
  drawText(`${player2Score}`, 3 * canvas.width / 4, 50);
}

setInterval(drawGame, 1000 / 60);
