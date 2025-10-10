const boardEl = document.getElementById('game2048');
const SIZE = 4;
let board = [];

function initBoard() {
	board = [];
	for (let r = 0; r < SIZE; r++) {
		board[r] = [];
		for (let c = 0; c < SIZE; c++) board[r][c] = 0;
	}
	spawn();
	spawn();
	render();
}

function spawn() {
	const empties = [];
	for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) if (board[r][c] === 0) empties.push([r, c]);
	if (empties.length === 0) return;
	const [r, c] = empties[Math.floor(Math.random() * empties.length)];
	board[r][c] = Math.random() < 0.9 ? 2 : 4;
}

function rotateRight(m) {
	const res = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
	for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) res[c][SIZE - 1 - r] = m[r][c];
	return res;
}

function slideLeftRow(row) {
	const arr = row.filter((v) => v !== 0);
	for (let i = 0; i < arr.length - 1; i++) {
		if (arr[i] === arr[i + 1]) {
			arr[i] *= 2;
			arr.splice(i + 1, 1);
		}
	}
	while (arr.length < SIZE) arr.push(0);
	return arr;
}

function move(direction) {
	// 0=left, 1=up,2=right,3=down
	let rotated = board;
	for (let i = 0; i < direction; i++) rotated = rotateRight(rotated);
	const newBoard = [];
	for (let r = 0; r < SIZE; r++) newBoard[r] = slideLeftRow(rotated[r]);
	for (let i = 0; i < (4 - direction) % 4; i++) newBoard = rotateRight(newBoard);
	// check change
	let changed = false;
	for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) if (board[r][c] !== newBoard[r][c]) changed = true;
	if (changed) {
		board = newBoard;
		spawn();
		render();
	}
}

function render() {
	boardEl.innerHTML = '';
	const grid = document.createElement('div');
	grid.className = 'grid';
	for (let r = 0; r < SIZE; r++) {
		for (let c = 0; c < SIZE; c++) {
			const cell = document.createElement('div');
			cell.className = 'cell';
			const v = board[r][c];
			cell.textContent = v === 0 ? '' : v;
			if (v === 0) cell.style.background = '#eee';
			else if (v === 2) cell.style.background = '#eee4da';
			else if (v === 4) cell.style.background = '#ede0c8';
			else cell.style.background = '#f2b179';
			grid.appendChild(cell);
		}
	}
	boardEl.appendChild(grid);
}

document.addEventListener('keydown', (e) => {
	if (e.key === 'ArrowLeft') move(0);
	if (e.key === 'ArrowUp') move(1);
	if (e.key === 'ArrowRight') move(2);
	if (e.key === 'ArrowDown') move(3);
});

initBoard();