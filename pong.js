const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Sons
const hitSound = new Audio("sounds/hit.wav");
const scoreSound = new Audio("sounds/score.wav");
const winSound = new Audio("sounds/win.wav");

// Cores
const paddleWidth = 10, paddleHeight = 100;
const ballSize = 10;

// Posições iniciais
let player1Score = 0, player2Score = 0;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 4, ballSpeedY = 4;
let player1Y = canvas.height / 2 - paddleHeight / 2, player2Y = canvas.height / 2 - paddleHeight / 2;
let gameOver = false;
let gameMode = '';

// Função para iniciar o jogo com um amigo
function startLocalGame() {
  gameMode = 'local';
  document.getElementById('menu').style.display = 'none';
  document.getElementById('gameContainer').style.display = 'block';
  resetGame();
}

// Função para iniciar o jogo contra o Bot
function startBotGame() {
  gameMode = 'bot';
  document.getElementById('menu').style.display = 'none';
  document.getElementById('gameContainer').style.display = 'block';
  resetGame();
}

// Função para resetar o jogo
function resetGame() {
  player1Score = 0;
  player2Score = 0;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = 4;
  ballSpeedY = 4;
  gameOver = false;
  document.getElementById("victory").style.display = "none";
}

// Configurações de IA
function updateBot() {
  const botCenter = player2Y + paddleHeight / 2;
  let diff = document.getElementById("difficulty").value;

  let speed = 2; // fácil
  if (diff === "medium") speed = 4;
  if (diff === "hard") speed = 6;

  if (botCenter < ballY - 10) player2Y += speed;
  else if (botCenter > ballY + 10) player2Y -= speed;
}

// Função para desenhar as raquetes
function drawPaddles() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);
}

// Função para desenhar a bola
function drawBall() {
  ctx.fillStyle = "white";
  ctx.fillRect(ballX, ballY, ballSize, ballSize);
}

// Função para desenhar o placar
function drawScore() {
  ctx.font = "30px Arial";
  ctx.fillText(player1Score, canvas.width / 4, 50);
  ctx.fillText(player2Score, canvas.width * 3 / 4, 50);
}

// Função para resetar a bola
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = 4;
}

// Função para verificar colisão com as raquetes
function checkPaddleCollision() {
  // Player 1
  if (ballX <= paddleWidth && ballY >= player1Y && ballY <= player1Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
    hitSound.play();
  }
  // Player 2
  if (ballX >= canvas.width - paddleWidth - ballSize && ballY >= player2Y && ballY <= player2Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
    hitSound.play();
  }
}

// Função para verificar se alguém fez ponto
function checkScore() {
  if (ballX <= 0) {
    player2Score++;
    scoreSound.play();
    resetBall();
  } else if (ballX >= canvas.width - ballSize) {
    player1Score++;
    scoreSound.play();
    resetBall();
  }

  if (player1Score === 10 || player2Score === 10) {
    gameOver = true;
    winSound.play();
    document.getElementById("victory").style.display = "block";
    document.getElementById("victory").innerText = player1Score === 10 ? "Jogador 1 venceu!" : "Jogador 2 venceu!";
  }
}

// Função de atualização do jogo
function update() {
  if (gameOver) return;

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY >= canvas.height - ballSize) {
    ballSpeedY = -ballSpeedY;
  }

  if (gameMode === 'bot') {
    updateBot();
  }
  checkPaddleCollision();
  checkScore();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddles();
  drawBall();
  drawScore();
}

// Função de controle dos jogadores
document.addEventListener("keydown", (e) => {
  if (gameMode === 'local') {
    if (e.key === "ArrowUp" && player2Y > 0) {
      player2Y -= 20;
    } else if (e.key === "ArrowDown" && player2Y < canvas.height - paddleHeight) {
      player2Y += 20;
    } else if (e.key === "w" && player1Y > 0) {
      player1Y -= 20;
    } else if (e.key === "s" && player1Y < canvas.height - paddleHeight) {
      player1Y += 20;
    }
  }
});

// Loop do jogo
function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

gameLoop();
