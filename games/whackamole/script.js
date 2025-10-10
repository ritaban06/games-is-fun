const container = document.getElementById('whackamole');
const GRID = 3;
let score = 0;
let timeLeft = 30; // seconds
let active = -1;
let intervalId;

function createGrid() {
	container.innerHTML = '';
	const info = document.createElement('div');
	info.className = 'info';
	info.innerHTML = `<span id="score">Score: 0</span> <span id="time">Time: ${timeLeft}</span>`;
	container.appendChild(info);

	const grid = document.createElement('div');
	grid.className = 'grid';
	for (let i = 0; i < GRID * GRID; i++) {
		const hole = document.createElement('div');
		hole.className = 'hole';
		hole.dataset.index = i;
		hole.addEventListener('click', () => hit(i));
		grid.appendChild(hole);
	}
	container.appendChild(grid);
}

function spawn() {
	const next = Math.floor(Math.random() * GRID * GRID);
	active = next;
	renderActive();
}

function renderActive() {
	const holes = container.querySelectorAll('.hole');
	holes.forEach((h) => {
		h.classList.remove('mole');
	});
	if (active >= 0) holes[active].classList.add('mole');
}

function hit(i) {
	if (i === active) {
		score += 1;
		document.getElementById('score').textContent = 'Score: ' + score;
		active = -1;
		renderActive();
	}
}

function tick() {
	timeLeft -= 1;
	document.getElementById('time').textContent = 'Time: ' + timeLeft;
	// spawn mole randomly
	if (Math.random() < 0.6) spawn();
	if (timeLeft <= 0) {
		clearInterval(intervalId);
		active = -1;
		renderActive();
		alert('Time up! Your score: ' + score);
	}
}

createGrid();
intervalId = setInterval(tick, 1000);
setInterval(() => { if (Math.random() < 0.5) spawn(); }, 800);