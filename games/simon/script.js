const startBtn = document.getElementById('start');
const lvlEl = document.getElementById('lvl');
const buttons = Array.from(document.querySelectorAll('.btn'));
const colors = ['green','red','yellow','blue'];
let seq=[], inputIndex=0, playing=false;

function flash(el){ el.classList.add('flash'); setTimeout(()=>el.classList.remove('flash'),300); }

async function playSeq(){ playing=true; for(const color of seq){ const el=document.querySelector(`.btn.${color}`); flash(el); await new Promise(r=>setTimeout(r,450)); } playing=false; }

function nextRound(){ seq.push(colors[Math.floor(Math.random()*4)]); lvlEl.textContent = `Level: ${seq.length}`; playSeq(); inputIndex=0; }

buttons.forEach(b=>b.addEventListener('click', ()=>{
  if(playing||seq.length===0) return;
  const color = b.dataset.color; flash(b);
  if(color===seq[inputIndex]){ inputIndex++; if(inputIndex===seq.length) setTimeout(nextRound,500); }
  else { lvlEl.textContent='Wrong! Press Start.'; seq=[]; }
}));

startBtn.addEventListener('click', ()=>{ if(playing) return; seq=[]; nextRound(); });
