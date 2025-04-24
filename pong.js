const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let mode = 'friend';
let maxScore = 10;  // Pontuação padrão

// Estado do jogo
let player1Y = 250, player2Y = 250, ballX = 400, ballY = 300;
let ballSpeedX = 5, ballSpeedY = 5;
let score1 = 0, score2 = 0;
let ballMoving = false;

const paddleWidth = 10, paddleHeight = 100, ballSize = 10;
const keys = {};

// Controle de teclas
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

// Iniciar o jogo
function startGame(selectedMode) {
  mode = selectedMode;
  document.getElementById('menu').style.display = 'none';
  canvas.style.display = 'block';
  initGame();
}

// Atualizar a pontuação máxima
function updateMaxScore() {
  const selectedMaxScore = document.getElementById('maxScore').value;
  maxScore = parseInt(selectedMaxScore);
}

// Desenhar retângulos
function drawRect(x, y, w, h, color = 'white') {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

// Desenhar a bola
function drawBall() {
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize / 2, 0, Math.PI * 2);
  ctx.fill();
}

// Criar partículas
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

// Exibir vencedor
function displayWinner(winner) {
  winSound.play();
  ctx.fillStyle = 'white';
  ctx.font = '40px monospace';
  ctx.fillText(`${winner} venceu!`, 300, 250);
  ctx.font = '20px monospace';
  ctx.fillText('Recarregue a página para jogar novamente.', 200, 300);
  cancelAnimationFrame(gameLoopId);
}

// Resetar a bola
function resetBall(winner) {
  ballX = 400;
  ballY = 300;
  ballSpeedX *= -1;
  ballSpeedY = 5 * (Math.random() > 0.5 ? 1 : -1);
  ballMoving = false;
  if (winner) displayWinner(winner);
}

// Atualizar o estado do jogo
function update() {
  if (!ballMoving) {
    setTimeout(() => ballMoving = true, 2000);  // 2 segundos de atraso após um ponto
    return;
  }

  // Movimentação do jogador 1
  if (keys['w'] && player1Y > 0) player1Y -= 7;
  if (keys['s'] && player1Y < canvas.height - paddleHeight) player1Y += 7;

  // Movimentação do jogador 2 ou IA
  if (mode === 'friend') {
    if (keys['ArrowUp'] && player2Y > 0) player2Y -= 7;
    if (keys['ArrowDown'] && player2Y < canvas.height - paddleHeight) player2Y += 7;
  } else {
    if (ballY < player2Y + paddleHeight / 2) player2Y -= 5;
    else if (ballY > player2Y + paddleHeight / 2) player2Y += 5;
  }

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Detectando colisão com as bordas superiores e inferiores
  if (ballY <= 0 || ballY >= canvas.height - ballSize) ballSpeedY *= -1;

  // Colisão com as raquetes
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

// Desenhar tudo na tela
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(10, player1Y, paddleWidth, paddleHeight);
  drawRect(canvas.width - 20, player2Y, paddleWidth, paddleHeight);
  drawBall();
  ctx.font = '20px monospace';
  ctx.fillText(`${score1} : ${score2}`, canvas.width / 2 - 30, 30);
}

// Loop do jogo
let gameLoopId;
function gameLoop() {
  update();
  draw();
  gameLoopId = requestAnimationFrame(gameLoop);
}

// Inicializar o jogo
function initGame() {
  score1 = 0;
  score2 = 0;
  gameLoop();
}
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const hitSound = document.getElementById('hitSound');
const scoreSound = document.getElementById('scoreSound');
const winSound = document.getElementById('winSound');

let mode = 'friend';
let maxScore = 10;
let player1Y = 250, player2Y = 250;
let ballX = 400, ballY = 300;
let ballSpeedX = 5, ballSpeedY = 5;
let score1 = 0, score2 = 0;
let ballMoving = false;

const paddleWidth = 10, paddleHeight = 100, ballSize = 10;
const keys = {};

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function startGame(selectedMode) {
  mode = selectedMode;
  updateMaxScore();
  document.getElementById('menu').style.display = 'none';
  canvas.style.display = 'block';
  initGame();
}

function updateMaxScore() {
  const sel = parseInt(document.getElementById('maxScore').value, 10);
  if ([7,10,15].includes(sel)) maxScore = sel;
}

function drawRect(x,y,w,h,color='white'){
  ctx.fillStyle=color;
  ctx.fillRect(x,y,w,h);
}

function drawBall(){
  ctx.fillStyle='white';
  ctx.beginPath();
  ctx.arc(ballX,ballY,ballSize/2,0,Math.PI*2);
  ctx.fill();
}

function drawParticles(x,y){
  for(let i=0;i<30;i++) setTimeout(()=>{
    ctx.fillStyle=`hsl(${Math.random()*360},100%,70%)`;
    ctx.beginPath();
    ctx.arc(x+Math.random()*30-15,y+Math.random()*30-15,2,0,Math.PI*2);
    ctx.fill();
  },i*10);
}

function displayWinner(winner){
  winSound.play();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='white';
  ctx.font='40px monospace';
  ctx.fillText(`${winner} venceu!`,300,250);
  ctx.font='20px monospace';
  ctx.fillText('Pressione R para reiniciar ou M para menu.',200,300);
  cancelAnimationFrame(gameLoopId);
}

document.addEventListener('keydown',e=>{
  if((e.key==='r'||e.key==='R')&&ballMoving===false) location.reload();
  if((e.key==='m'||e.key==='M')&&ballMoving===false) location.reload();
});

function resetBall(winner){
  ballX = winner==='Jogador 1' ? 20 + paddleWidth + 1 : canvas.width - 20 - paddleWidth - 1;
  ballY = winner==='Jogador 1' ? player1Y + paddleHeight/2 : player2Y + paddleHeight/2;
  ballSpeedX = (winner==='Jogador 1'?1:-1)*5;
  ballSpeedY = 5*(Math.random()>0.5?1:-1);
  ballMoving=false;
  if(winner) return displayWinner(winner);
}

function update(){
  if(!ballMoving){ setTimeout(()=>ballMoving=true,2000); return; }
  if(keys['w']&&player1Y>0) player1Y-=7;
  if(keys['s']&&player1Y<canvas.height-paddleHeight) player1Y+=7;
  if(mode==='friend'){
    if(keys['ArrowUp']&&player2Y>0) player2Y-=7;
    if(keys['ArrowDown']&&player2Y<canvas.height-paddleHeight) player2Y+=7;
  } else {
    if(ballY<player2Y+paddleHeight/2) player2Y-=5;
    else if(ballY>player2Y+paddleHeight/2) player2Y+=5;
  }
  ballX+=ballSpeedX; ballY+=ballSpeedY;
  if(ballY<=0||ballY>=canvas.height-ballSize) ballSpeedY*=-1;
  if((ballX<20&&ballY>player1Y&&ballY<player1Y+paddleHeight)||
     (ballX>canvas.width-20&&ballY>player2Y&&ballY<player2Y+paddleHeight)){
    ballSpeedX*=-1; hitSound.play(); }
  if(ballX<0){ score2++; scoreSound.play(); drawParticles(ballX,ballY);
    if(score2>=maxScore) return resetBall('Jogador 2'); resetBall(); }
  if(ballX>canvas.width){ score1++; scoreSound.play(); drawParticles(ballX,ballY);
    if(score1>=maxScore) return resetBall('Jogador 1'); resetBall(); }
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawRect(10,player1Y,paddleWidth,paddleHeight);
  drawRect(canvas.width-20,player2Y,paddleWidth,paddleHeight);
  drawBall();
  ctx.font='20px monospace';
  ctx.fillText(`${score1} : ${score2}`,canvas.width/2-30,30);
}

let gameLoopId;
function gameLoop(){ update(); draw(); gameLoopId=requestAnimationFrame(gameLoop); }

function initGame(){ score1=0; score2=0; player1Y=250; player2Y=250; resetBall(); gameLoop(); }
```
