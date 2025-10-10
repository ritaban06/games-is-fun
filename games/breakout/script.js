const canvas = document.getElementById('breakoutCanvas');
const ctx = canvas.getContext('2d');

const W = canvas.width;
const H = canvas.height;

const paddle = { w: 60, h: 10, x: W / 2 - 30, y: H - 30, dx: 0 };
const ball = { x: W / 2, y: H - 45, r: 6, vx: 3, vy: -3 };

const brickRow = 4;
const brickCol = 6;
const brickW = 56;
const brickH = 14;
const brickPadding = 6;
const bricks = [];

for (let r = 0; r < brickRow; r++) {
	bricks[r] = [];
	for (let c = 0; c < brickCol; c++) {
		const x = c * (brickW + brickPadding) + 10;
		const y = r * (brickH + brickPadding) + 30;
		bricks[r][c] = { x, y, alive: true };
	}
}

let score = 0;

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

function update() {
	// paddle
	paddle.x += paddle.dx;
	if (paddle.x < 0) paddle.x = 0;
	if (paddle.x + paddle.w > W) paddle.x = W - paddle.w;

	// ball
	ball.x += ball.vx;
	ball.y += ball.vy;

	// walls
	if (ball.x - ball.r < 0 || ball.x + ball.r > W) ball.vx *= -1;
	if (ball.y - ball.r < 0) ball.vy *= -1;

	// paddle collision
	if (
		ball.x > paddle.x &&
		ball.x < paddle.x + paddle.w &&
		ball.y + ball.r > paddle.y
	) {
		ball.vy *= -1;
		// add spin based on where it hit
		const hit = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
		ball.vx += hit * 1.2;
		ball.y = paddle.y - ball.r;
	}

	// brick collisions
	for (let r = 0; r < brickRow; r++) {
		for (let c = 0; c < brickCol; c++) {
			const b = bricks[r][c];
			if (b.alive) {
				if (
					ball.x > b.x &&
					ball.x < b.x + brickW &&
					ball.y > b.y &&
					ball.y < b.y + brickH
				) {
					b.alive = false;
					ball.vy *= -1;
					score += 10;
				}
			}
		}
	}

	// lose
	if (ball.y - ball.r > H) {
		// reset
		ball.x = W / 2;
		ball.y = H - 45;
		ball.vx = 3;
		ball.vy = -3;
		score = 0;
		// revive bricks
		for (let r = 0; r < brickRow; r++) for (let c = 0; c < brickCol; c++) bricks[r][c].alive = true;
	}
}

function draw() {
	ctx.clearRect(0, 0, W, H);

	// bricks
	for (let r = 0; r < brickRow; r++) {
		for (let c = 0; c < brickCol; c++) {
			const b = bricks[r][c];
			if (b.alive) drawRect(b.x, b.y, brickW, brickH, '#e67');
		}
	}

	// paddle
	drawRect(paddle.x, paddle.y, paddle.w, paddle.h, '#06b');

	// ball
	drawCircle(ball.x, ball.y, ball.r, '#222');

	// score
	ctx.fillStyle = '#333';
	ctx.font = '14px Arial';
	ctx.fillText('Score: ' + score, 8, 18);
}

function loop() {
	update();
	draw();
	requestAnimationFrame(loop);
}

document.addEventListener('keydown', (e) => {
	if (e.key === 'ArrowLeft') paddle.dx = -6;
	if (e.key === 'ArrowRight') paddle.dx = 6;
});
document.addEventListener('keyup', (e) => {
	if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') paddle.dx = 0;
});

requestAnimationFrame(loop);