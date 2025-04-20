let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

// Parâmetros do jogo
let paddleHeight = 100;
let paddleWidth = 10;
let ballSize = 10;
let player1Y, player2Y, player1X, player2X, ballX, ballY, ballSpeedX, ballSpeedY;
let scorePlayer1 = 0, scorePlayer2 = 0;
let gameOver = false;
let difficulty = 'medium';
let mode = 'local'; // 'local' ou 'bot'

// Função para escolher o modo de jogo
function startGame(selectedMode) {
  mode = selectedMode;
  scorePlayer1 = 0;
  scorePlayer2 = 0;
  player1Y = canvas.height / 2 - paddleHeight / 2;
  player2Y = canvas.height / 2 - paddleHeight / 2;
  player1X = 0;
  player2X = canvas.width - paddleWidth;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = 5;
  ballSpeedY = 5;
  gameOver = false;
  document.getElementById("victoryMessage").style.display = "none";
  document.querySelector('button').style.display = 'none';
  document.querySelectorAll('button')[1].style.display = 'none';
  draw();
}

// Função de IA do Bot
function updateBot() {
  const botCenter = player2Y + paddleHeight / 2;
  const ballSpeed = ballSpeedX;
  let speed = 2;
  if (difficulty === 'medium') speed = 4;
  if (difficulty === 'hard') speed = 6;

  if (ballSpeed > 0) {
    if (botCenter < ballY - paddleHeight / 3) player2Y += speed;
    else if (botCenter > ballY + paddleHeight / 3) player2Y -= speed;
  }
}

// Função para desenhar as raquetes
function drawPaddles() {
  ctx.fillStyle = 'white';
  ctx.fillRect(player1X, player1Y, paddleWidth, paddleHeight);
  ctx.fillRect(player2X, player2Y, paddleWidth, paddleHeight);
}

// Função para desenhar a bola
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
}

// Função para criar o efeito de partículas
function createExplosion(x, y, numParticles) {
  const colors = ["#ff0000", "#ff9900", "#66ff66", "#3399ff"];
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    const speed = Math.random() * 2 + 1;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 30;
    particle.style.animation = `explode ${speed}s ease-out forwards`;
    particle.style.animationDelay = `${Math.random() * 0.5}s`;
    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, speed * 1000);
  }
}

// Função para desenhar o placar
function drawScore() {
  ctx.font = '30px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(scorePlayer1, canvas.width / 4, 50);
  ctx.fillText(scorePlayer2, 3 * canvas.width / 4, 50);
}

// Função para atualizar a pontuação
function updateScore(player) {
  if (player === 1) {
    scorePlayer1++;
    createExplosion(player1X + 50, player1Y + 50, 10);
  } else {
    scorePlayer2++;
    createExplosion(player2X - 50, player2Y + 50, 10);
  }

  if (scorePlayer1 === 10 || scorePlayer2 === 10) {
    endGame();
  }
}

// Função para finalizar o jogo
function endGame() {
  gameOver = true;
  const victoryMessage = document.getElementById("victoryMessage");
  victoryMessage.innerText = scorePlayer1 > scorePlayer2 ? "Jogador 1 Venceu!" : "Jogador 2 Venceu!";
  document.getElementById("victoryMessage").style.display = "block";
  setTimeout(() => {
    victoryMessage.innerHTML += '<br><button onclick="restartGame()">Jogar Novamente</button>';
  }, 2000);
}

// Função para reiniciar o jogo
function restartGame() {
  scorePlayer1 = 0;
  scorePlayer2 = 0;
  player1Y = canvas.height / 2 - paddleHeight / 2;
  player2Y = canvas.height / 2 - paddleHeight / 2;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = 5;
  ballSpeedY = 5;
  gameOver = false;
  document.getElementById("victoryMessage").style.display = "none";
}

// Função para desenhar o jogo
function draw() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPaddles();
  drawBall();
  drawScore();

  // Movimento da bola
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Colisão com o teto e o chão
  if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Colisão com as raquetes
  if (ballX - ballSize < player1X + paddleWidth && ballY > player1Y && ballY < player1Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballX + ballSize > player2X && ballY > player2Y && ballY < player2Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Pontuação
  if (ballX - ballSize < 0) {
    updateScore(2);
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 5;
    ballSpeedY = 5;
  }
  if (ballX + ballSize > canvas.width) {
    updateScore(1);
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -5;
    ballSpeedY = 5;
  }

  // Atualizar a IA se o modo for 'bot'
  if (mode === 'bot' && ballSpeedX > 0) {
    updateBot();
  }

  requestAnimationFrame(draw);
}

// Função de controle de teclado
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp' && player2Y > 0) player2Y -= 20;
  if (event.key === 'ArrowDown' && player2Y < canvas.height - paddleHeight) player2Y += 20;
  if (event.key === 'w' && player1Y > 0) player1Y -= 20;
  if (event.key === 's' && player1Y < canvas.height - paddleHeight) player1Y += 20;
});

// Iniciar o jogo
draw();
