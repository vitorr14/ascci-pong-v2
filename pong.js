// pong.js
const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d');

let mode        = 'friend';
let maxScore    = 10;
let player1Y    = 250, player2Y = 250;
let ballX       = 400, ballY = 300;
let ballSpeedX  = 5, ballSpeedY = 5;
let score1      = 0, score2 = 0;
let ballMoving  = false;

const pw = 10, ph = 100, bs = 10;
const keys = {};

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup',   e => keys[e.key] = false);

function startGame(selectedMode) {
  mode = selectedMode;
  updateMaxScore();
  document.getElementById('menu').style.display = 'none';
  canvas.style.display = 'block';
  initGame();
}

function updateMaxScore() {
  const v = parseInt(document.getElementById('maxScore').value,10);
  if ([7,10,15].includes(v)) maxScore = v;
}

function drawRect(x,y,w,h){
  ctx.fillStyle = 'white';
  ctx.fillRect(x,y,w,h);
}

function drawBall(){
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(ballX, ballY, bs/2, 0, Math.PI*2);
  ctx.fill();
}

function displayWinner(w){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = 'white';
  ctx.font = '40px monospace';
  ctx.fillText(`${w} venceu!`, 300, 250);
  ctx.font = '20px monospace';
  ctx.fillText('Pressione R para reiniciar ou M para menu', 200, 300);
  cancelAnimationFrame(loopId);
}

document.addEventListener('keydown', e=>{
  if(!ballMoving && (e.key==='r'||e.key==='R')) location.reload();
  if(!ballMoving && (e.key==='m'||e.key==='M')) location.reload();
});

function resetBall(winner){
  // posiciona frente de quem venceu
  if(winner==='Jogador 1'){
    ballX = 20 + pw + 1;
    ballY = player1Y + ph/2;
    ballSpeedX = 5;
  } else if(winner==='Jogador 2'){
    ballX = canvas.width - 20 - pw - 1;
    ballY = player2Y + ph/2;
    ballSpeedX = -5;
  } else {
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    ballSpeedX *= -1;
    ballSpeedY = (Math.random()>0.5?1:-1)*5;
  }
  ballMoving = false;
  if(winner) return displayWinner(winner);
}

function update(){
  if(!ballMoving){
    setTimeout(()=>ballMoving=true,2000);
    return;
  }
  if(keys['w'] && player1Y>0)                player1Y -= 7;
  if(keys['s'] && player1Y<canvas.height-ph) player1Y += 7;
  if(mode==='friend'){
    if(keys['ArrowUp'] && player2Y>0)                player2Y -= 7;
    if(keys['ArrowDown'] && player2Y<canvas.height-ph) player2Y += 7;
  } else {
    if(ballY < player2Y+ph/2) player2Y -= 5;
    else                     player2Y += 5;
  }
  ballX += ballSpeedX; ballY += ballSpeedY;
  if(ballY <= 0 || ballY >= canvas.height-bs) ballSpeedY *= -1;
  if((ballX < 20 && ballY>player1Y && ballY<player1Y+ph) ||
     (ballX > canvas.width-20 && ballY>player2Y && ballY<player2Y+ph)){
    ballSpeedX *= -1;
  }
  if(ballX < 0){
    score2++;
    if(score2 >= maxScore) return resetBall('Jogador 2');
    resetBall();
  }
  if(ballX > canvas.width){
    score1++;
    if(score1 >= maxScore) return resetBall('Jogador 1');
    resetBall();
  }
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawRect(10, player1Y, pw, ph);
  drawRect(canvas.width-20, player2Y, pw, ph);
  drawBall();
  ctx.font = '20px monospace';
  ctx.fillText(`${score1} : ${score2}`, canvas.width/2-30, 30);
}

let loopId;
function gameLoop(){
  update();
  draw();
  loopId = requestAnimationFrame(gameLoop);
}

function initGame(){
  score1 = 0; score2 = 0;
  player1Y = player2Y = 250;
  resetBall();
  gameLoop();
}
