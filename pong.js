const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const menu = document.getElementById('menu');
const gameScreen = document.getElementById('gameScreen');
const victoryScreen = document.getElementById('victoryScreen');
const finalMessage = document.getElementById('finalMessage');

let player1Y, player2Y, ballX, ballY, ballSpeedX, ballSpeedY;
let score1 = 0, score2 = 0;
let maxScore = 10;
let gameMode = 'friend';
let gameLoopId;

const paddleWidth = 10, paddleHeight = 100, ballSize = 10;
const keys = {};

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function startGame(mode) {
  const input = document.getElementById('maxScore').value;
  const parsed = parseInt(input);
  if (![7, 10, 15].includes(parsed)) {
    alert("Escolha apenas 7, 10 ou 15 como pontuação máxima.");
    return;
  }
  maxScore = parsed;
  gameMode = mode;
  menu.style.display = 'none';
  gameScreen.style.display = 'block';
  victoryScreen.style.display = 'none';
  resetGame();
  gameLoop();
}

function resetGame() {
  player1Y = canvas.height / 2 - paddleHeight / 2;
  player2Y = canvas.height / 2 - paddleHeight / 2;
  score1 = 0;
  score2 = 0;
  resetBall();
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
  ballSpeedY = 5 * (Math.random() > 0.5 ? 1 : -1);
}

function drawRect(x, y, w, h, color = 'white') {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawBall() {
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawParticles(x, y) {
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 70%)`;
      ctx.beginPath();
      ctx.arc(x + Math.random() * 30 - 15, y + Math.random() * 30 - 15, 2, 0, Math.PI * 2);
      ctx.fill();
    }, i * 10);
  }
}

function update() {
  // Movimentação dos jogadores
  if (keys['w'] && player1Y > 0) player1Y -= 7;
  if (keys['s'] && player1Y < canvas.height - paddleHeight) player1Y += 7;

  if (gameMode === 'friend') {
    if (keys['ArrowUp'] && player2Y > 0) player2Y -= 7;
    if (keys['ArrowDown'] && player2Y < canvas.height - paddleHeight) player2Y += 7;
  } else {
    if (ballY < player2Y + paddleHeight / 2) player2Y -= 5;
    else if (ballY > player2Y + paddleHeight / 2) player2Y += 5;
  }

  // Movimento da bola
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY >= canvas.height - ballSize) ballSpeedY *= -1;

  // Colisão com raquetes
  if (
    ballX < 20 && ballY > player1Y && ballY < player1Y + paddleHeight ||
    ballX > canvas.width - 20 && ballY > player2Y && ballY < player2Y + paddleHeight
  ) {
    ballSpeedX *= -1;
    // document.getElementById('hitSound').play();
  }

  // Pontuação
  if (ballX < 0) {
    score2++;
    drawParticles(ballX, ballY);
    // document.getElementById('scoreSound').play();
    if (score2 >= maxScore) {
      showVictory('Jogador 2');
    } else resetBall();
  }
  if (ballX > canvas.width) {
    score1++;
    drawParticles(ballX, ballY);
    // document.getElementById('scoreSound').play();
    if (score1 >= maxScore) {
      showVictory('Jogador 1');
    } else resetBall();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(10, player1Y, paddleWidth, paddleHeight);
  drawRect(canvas.width - 20, player2Y, paddleWidth, paddleHeight);
  drawBall();
  ctx.font = '20px monospace';
  ctx.fillText(`${score1} : ${score2}`, canvas.width / 2 - 30, 30);
}

function gameLoop() {
  update();
  draw();
  gameLoopId = requestAnimationFrame(gameLoop);
}

function showVictory(winner) {
  // document.getElementById('winSound').play();
  cancelAnimationFrame(gameLoopId);
  gameScreen.style.display = 'none';
  victoryScreen.style.display = 'flex';
  finalMessage.innerText = `${winner} venceu!`;
}

function tryAgain() {
  resetGame();
  gameScreen.style.display = 'block';
  victoryScreen.style.display = 'none';
  gameLoop();
}

function returnToMenu() {
  cancelAnimationFrame(gameLoopId);
  menu.style.display = 'flex';
  gameScreen.style.display = 'none';
  victoryScreen.style.display = 'none';
}
