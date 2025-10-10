// Simple Pong implementation
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const paddleHeight = 50;
const paddleWidth = 8;

const player = { x: 10, y: HEIGHT / 2 - paddleHeight / 2, dy: 0 };
const ai = { x: WIDTH - 10 - paddleWidth, y: HEIGHT / 2 - paddleHeight / 2, dy: 0 };

const ball = { x: WIDTH / 2, y: HEIGHT / 2, vx: 3, vy: 2, r: 6 };

let playerScore = 0;
let aiScore = 0;

function drawRect(x, y, w, h, color = '#000') {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color = '#000') {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2);
	ctx.fill();
}

function drawNet() {
	ctx.fillStyle = '#ccc';
	const step = 10;
	for (let y = 0; y < HEIGHT; y += step * 2) {
		ctx.fillRect(WIDTH / 2 - 1, y, 2, step);
	}
}

function resetBall(direction = 1) {
	ball.x = WIDTH / 2;
	ball.y = HEIGHT / 2;
	ball.vx = 3 * direction;
	ball.vy = (Math.random() * 3 - 1.5);
}

function update() {
	// move paddles
	player.y += player.dy;
	if (player.y < 0) player.y = 0;
	if (player.y + paddleHeight > HEIGHT) player.y = HEIGHT - paddleHeight;

	// simple AI: follow ball with smoothing
	const target = ball.y - paddleHeight / 2;
	ai.y += (target - ai.y) * 0.08;
	if (ai.y < 0) ai.y = 0;
	if (ai.y + paddleHeight > HEIGHT) ai.y = HEIGHT - paddleHeight;

	// move ball
	ball.x += ball.vx;
	ball.y += ball.vy;

	// top/bottom collision
	if (ball.y - ball.r < 0 || ball.y + ball.r > HEIGHT) {
		ball.vy *= -1;
	}

	// left paddle collision
	if (
		ball.x - ball.r < player.x + paddleWidth &&
		ball.y > player.y &&
		ball.y < player.y + paddleHeight
	) {
		ball.vx *= -1.05;
		// add spin based on where it hit
		const delta = ball.y - (player.y + paddleHeight / 2);
		ball.vy = delta * 0.12;
		ball.x = player.x + paddleWidth + ball.r; // prevent sticking
	}

	// right paddle collision
	if (
		ball.x + ball.r > ai.x &&
		ball.y > ai.y &&
		ball.y < ai.y + paddleHeight
	) {
		ball.vx *= -1.05;
		const delta = ball.y - (ai.y + paddleHeight / 2);
		ball.vy = delta * 0.12;
		ball.x = ai.x - ball.r;
	}

	// score
	if (ball.x - ball.r < 0) {
		aiScore++;
		resetBall(1);
	}
	if (ball.x + ball.r > WIDTH) {
		playerScore++;
		resetBall(-1);
	}
}

function draw() {
	// clear
	ctx.fillStyle = '#f5f5f5';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);

	drawNet();

	// paddles
	drawRect(player.x, player.y, paddleWidth, paddleHeight, '#0b6');
	drawRect(ai.x, ai.y, paddleWidth, paddleHeight, '#06b');

	// ball
	drawCircle(ball.x, ball.y, ball.r, '#333');

	// scores
	ctx.fillStyle = '#333';
	ctx.font = '20px Arial';
	ctx.fillText(playerScore, WIDTH / 4, 30);
	ctx.fillText(aiScore, (WIDTH / 4) * 3, 30);
}

function loop() {
	update();
	draw();
	requestAnimationFrame(loop);
}

// controls
document.addEventListener('keydown', (e) => {
	if (e.key === 'ArrowUp') player.dy = -5;
	if (e.key === 'ArrowDown') player.dy = 5;
});
document.addEventListener('keyup', (e) => {
	if (e.key === 'ArrowUp' || e.key === 'ArrowDown') player.dy = 0;
});

resetBall(1);
requestAnimationFrame(loop);