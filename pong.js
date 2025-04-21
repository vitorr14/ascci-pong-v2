const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const hitSound = document.getElementById('hitSound');
const scoreSound = document.getElementById('scoreSound');
const winSound = document.getElementById('winSound');

let mode = 'friend';

function startGame(selectedMode) {
  mode = selectedMode;
  document.getElementById('menu').style.display = 'none';
  canvas.style.display = 'block';
  initGame();
}

// Constantes do jogo
const paddleWidth = 10, paddleHeight = 100, ballSize = 10;
let player1Y = 250, player2Y = 250, ballX = 400, ballY = 300;
let ballSpeedX = 5, ballSpeedY = 5;
let score1 = 0, score2 = 0;
let maxScore = 10;  // Pontuação máxima padrão (pode ser alterada)

const keys = {};
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

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

function resetBall(winner) {
  ballX = 400;
  ballY = 300;
  ballSpeedX *= -1;
  ballSpeedY = 5 * (Math.random() > 0.5 ? 1 : -1);
  if (winner) displayWinner(winner);
}

function displayWinner(winner) {
  winSound.play();
  ctx.fillStyle = 'white';
  ctx.font = '40px monospace';
  ctx.fillText(`${winner} venceu!`, 300, 250);
  ctx.font = '20px monospace';
  ctx.fillText('Recarregue a página para jogar novamente.', 200, 300);
  cancelAnimationFrame(gameLoopId);
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
  if (keys['w'] && player1Y > 0) player1Y -= 7;
  if (keys['s'] && player1Y < canvas.height - paddleHeight) player1Y += 7;

  if (mode === 'friend') {
    if (keys['ArrowUp'] && player2Y > 0) player2Y -= 7;
    if (keys['ArrowDown'] && player2Y < canvas.height - paddleHeight) player2Y += 7;
  } else {
    if (ballY < player2Y + paddleHeight / 2) player2Y -= 5;
    else if (ballY > player2Y + paddleHeight / 2) player2Y += 5;
  }

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY >= canvas.height - ballSize) ballSpeedY *= -1;

  // Colisão com raquetes
  if (
    ballX < 20 && ballY > player1Y && ballY < player1Y + paddleHeight ||
    ballX > canvas.width - 20 && ballY > player2Y && ballY < player2Y + paddleHeight
  ) {
    ballSpeedX *= -1;
    hitSound.play();
  }

  // Pontuação
  if (ballX < 0) {
    score2++;
    scoreSound.play();
    drawParticles(ballX, ballY);
    if (score2 >= maxScore) return resetBall('Jogador 2');
    resetBall();
  }
  if (ballX > canvas.width) {
    score1++;
    scoreSound.play();
    drawParticles(ballX, ballY);
    if (score1 >= maxScore) return resetBall('Jogador 1');
    resetBall();
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

let gameLoopId;
function gameLoop() {
  update();
  draw();
  gameLoopId = requestAnimationFrame(gameLoop);
}

function initGame() {
  // Pergunta ao usuário qual pontuação ele quer
  const userMaxScore = prompt('Escolha a pontuação máxima (7, 10 ou 15):');
  maxScore = [7, 10, 15].includes(parseInt(userMaxScore)) ? parseInt(userMaxScore) : 10;
  gameLoop();
}
