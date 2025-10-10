const ROWS = 6, COLS = 7;
const boardEl = document.getElementById('board');
const turnEl = document.getElementById('turn');
const resetBtn = document.getElementById('reset');
let grid, turn = 'red', over=false;

function newGame(){
  grid = Array.from({length:ROWS}, ()=>Array.from({length:COLS}, ()=>null));
  turn='red'; over=false; render(); updateTurn();
}

function render(){
  boardEl.innerHTML='';
  for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++){
    const s=document.createElement('div'); s.className='slot';
    const val=grid[r][c]; if(val) s.classList.add(val);
    s.dataset.col=c; s.addEventListener('click', ()=>drop(c));
    boardEl.appendChild(s);
  }
}

function drop(col){
  if(over) return;
  for(let r=ROWS-1;r>=0;r--){
    if(!grid[r][col]){ grid[r][col]=turn; if(checkWin(r,col)){ over=true; turnEl.textContent = turn.toUpperCase()+' wins!'; } else { turn = turn==='red' ? 'yellow' : 'red'; updateTurn(); } render(); return; }
  }
}

function updateTurn(){ turnEl.textContent = over? '' : `Turn: ${turn}` }

function checkWin(r,c){
  const color = grid[r][c];
  const dirs = [[1,0],[0,1],[1,1],[1,-1]];
  for(const [dr,dc] of dirs){
    let count=1;
    for(let k=1;k<4;k++){ const nr=r+dr*k,nc=c+dc*k; if(nr<0||nr>=ROWS||nc<0||nc>=COLS||grid[nr][nc]!==color) break; count++; }
    for(let k=1;k<4;k++){ const nr=r-dr*k,nc=c-dc*k; if(nr<0||nr>=ROWS||nc<0||nc>=COLS||grid[nr][nc]!==color) break; count++; }
    if(count>=4) return true;
  }
  return false;
}

resetBtn.addEventListener('click', newGame);
newGame();
