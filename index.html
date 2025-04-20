<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ASCII Pong</title>
    <style>
        body {
            font-family: 'Courier New', Courier, monospace;
            text-align: center;
            background-color: black;
            color: white;
        }
        canvas {
            border: 2px solid white;
            margin-top: 20px;
        }
        button {
            padding: 10px;
            margin: 10px;
            font-size: 18px;
            cursor: pointer;
        }
        .hidden {
            display: none;
        }
        .victory-message {
            font-size: 24px;
            margin-top: 50px;
            color: white;
        }
    </style>
</head>
<body>
    <h1>ASCII Pong</h1>
    <div id="menu">
        <button id="playWithFriend">Jogar com Amigo</button>
        <button id="playWithBot">Jogar Contra o Bot</button>
    </div>
    <div id="game" class="hidden">
        <canvas id="pong" width="800" height="600"></canvas>
        <div class="victory-message hidden" id="victoryMessage"></div>
        <button id="restartGame" class="hidden">Jogar Novamente</button>
    </div>
    <script>
        const canvas = document.getElementById("pong");
        const ctx = canvas.getContext("2d");
        const playWithFriendButton = document.getElementById("playWithFriend");
        const playWithBotButton = document.getElementById("playWithBot");
        const gameDiv = document.getElementById("game");
        const menuDiv = document.getElementById("menu");
        const victoryMessage = document.getElementById("victoryMessage");
        const restartButton = document.getElementById("restartGame");

        const PADDLE_WIDTH = 20, PADDLE_HEIGHT = 100;
        const BALL_RADIUS = 10;
        const UP_KEY = 38, DOWN_KEY = 40, W_KEY = 87, S_KEY = 83;

        let paddle1Y = 250, paddle2Y = 250, ballX = 400, ballY = 300;
        let ballSpeedX = 5, ballSpeedY = 5, paddle1Speed = 0, paddle2Speed = 0;
        let scorePlayer1 = 0, scorePlayer2 = 0, mode = "friend"; // friend or bot

        const updateGame = () => {
            ballX += ballSpeedX;
            ballY += ballSpeedY;

            // Control paddle1 (Player 1)
            if (paddle1Speed > 0 && paddle1Y < canvas.height - PADDLE_HEIGHT) paddle1Y += paddle1Speed;
            if (paddle1Speed < 0 && paddle1Y > 0) paddle1Y += paddle1Speed;

            // Control paddle2 (Player 2 or Bot)
            if (mode === "friend") {
                if (paddle2Speed > 0 && paddle2Y < canvas.height - PADDLE_HEIGHT) paddle2Y += paddle2Speed;
                if (paddle2Speed < 0 && paddle2Y > 0) paddle2Y += paddle2Speed;
            } else if (mode === "bot") {
                // Simple AI for Bot
                if (ballY > paddle2Y + PADDLE_HEIGHT / 2) paddle2Y += 4;
                if (ballY < paddle2Y + PADDLE_HEIGHT / 2) paddle2Y -= 4;
            }

            // Ball collision with top/bottom
            if (ballY <= BALL_RADIUS || ballY >= canvas.height - BALL_RADIUS) {
                ballSpeedY = -ballSpeedY;
            }

            // Ball collision with paddles
            if (ballX <= PADDLE_WIDTH && ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT ||
                ballX >= canvas.width - PADDLE_WIDTH - BALL_RADIUS && ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX;
            }

            // Ball out of bounds
            if (ballX <= 0) {
                scorePlayer2++;
                resetBall();
            } else if (ballX >= canvas.width) {
                scorePlayer1++;
                resetBall();
            }

            // Draw everything
            drawCanvas();
            drawScore();
            drawPaddles();
            drawBall();
        };

        const drawCanvas = () => {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        const drawPaddles = () => {
            ctx.fillStyle = "white";
            ctx.fillRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT);
            ctx.fillRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT);
        };

        const drawBall = () => {
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
        };

        const drawScore = () => {
            ctx.fillStyle = "white";
            ctx.font = "32px Arial";
            ctx.fillText(scorePlayer1, canvas.width / 4, 50);
            ctx.fillText(scorePlayer2, 3 * canvas.width / 4, 50);
        };

        const resetBall = () => {
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;
            ballSpeedX = -ballSpeedX;
            ballSpeedY = 5 * (Math.random() > 0.5 ? 1 : -1);
        };

        const startGame = (selectedMode) => {
            mode = selectedMode;
            menuDiv.classList.add("hidden");
            gameDiv.classList.remove("hidden");
            requestAnimationFrame(gameLoop);
        };

        const gameLoop = () => {
            updateGame();
            requestAnimationFrame(gameLoop);
        };

        playWithFriendButton.addEventListener("click", () => startGame("friend"));
        playWithBotButton.addEventListener("click", () => startGame("bot"));
        restartButton.addEventListener("click", () => location.reload());

        // Keyboard controls
        document.addEventListener("keydown", (event) => {
            if (event.keyCode === W_KEY) paddle1Speed = -8;
            if (event.keyCode === S_KEY) paddle1Speed = 8;
            if (event.keyCode === UP_KEY) paddle2Speed = -8;
            if (event.keyCode === DOWN_KEY) paddle2Speed = 8;
        });

        document.addEventListener("keyup", (event) => {
            if (event.keyCode === W_KEY || event.keyCode === S_KEY) paddle1Speed = 0;
            if (event.keyCode === UP_KEY || event.keyCode === DOWN_KEY) paddle2Speed = 0;
        });
    </script>
</body>
</html>
