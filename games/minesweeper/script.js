const ROWS = 8;
const COLS = 8;
const MINES = 10;

const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const newBtn = document.getElementById('new');

let grid;

function newGame() {
  grid = Array.from({length: ROWS}, () => Array.from({length: COLS}, () => ({mine:false, revealed:false, adjacent:0})));
  // place mines
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random()*ROWS);
    const c = Math.floor(Math.random()*COLS);
    if (!grid[r][c].mine) { grid[r][c].mine = true; placed++; }
  }
  // compute adjacent
  for (let r=0;r<ROWS;r++) for (let c=0;c<COLS;c++) {
    if (grid[r][c].mine) continue;
    let count = 0;
    for (let dr=-1;dr<=1;dr++) for (let dc=-1;dc<=1;dc++) {
      const nr=r+dr, nc=c+dc;
      if (nr>=0 && nr<ROWS && nc>=0 && nc<COLS && grid[nr][nc].mine) count++;
    }
    grid[r][c].adjacent = count;
  }
  render();
  statusEl.textContent = '';
}

function render() {
  boardEl.style.gridTemplateColumns = `repeat(${COLS}, 28px)`;
  boardEl.innerHTML = '';
  for (let r=0;r<ROWS;r++) for (let c=0;c<COLS;c++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    const data = grid[r][c];
    if (data.revealed) {
      cell.classList.add('revealed');
      if (data.mine) cell.classList.add('mine'), cell.textContent = '💣';
      else if (data.adjacent>0) cell.textContent = data.adjacent;
    }
    cell.addEventListener('click', ()=> onClick(r,c));
    boardEl.appendChild(cell);
  }
}

function reveal(r,c) {
  const cell = grid[r][c];
  if (cell.revealed) return;
  cell.revealed = true;
  if (cell.adjacent===0 && !cell.mine) {
    for (let dr=-1;dr<=1;dr++) for (let dc=-1;dc<=1;dc++) {
      const nr=r+dr, nc=c+dc;
      if (nr>=0 && nr<ROWS && nc>=0 && nc<COLS) reveal(nr,nc);
    }
  }
}

function onClick(r,c) {
  const cell = grid[r][c];
  if (cell.mine) {
    // reveal all mines
    for (let i=0;i<ROWS;i++) for (let j=0;j<COLS;j++) if (grid[i][j].mine) grid[i][j].revealed = true;
    render();
    statusEl.textContent = 'You hit a mine!';
  } else {
    reveal(r,c);
    render();
    checkWin();
  }
}

function checkWin() {
  let safe = 0;
  for (let r=0;r<ROWS;r++) for (let c=0;c<COLS;c++) if (!grid[r][c].mine && grid[r][c].revealed) safe++;
  if (safe === ROWS*COLS - MINES) statusEl.textContent = 'You win!';
}

newBtn.addEventListener('click', newGame);
newGame();
