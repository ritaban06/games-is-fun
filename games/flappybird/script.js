const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
let w=canvas.width, h=canvas.height;

let bird = {x:60,y:h/2,vy:0};
let pipes = [];
let frames=0, score=0, over=false;

function reset(){ bird={x:60,y:h/2,vy:0}; pipes=[]; frames=0; score=0; over=false; scoreEl.textContent='0'; }

function loop(){
  frames++;
  bird.vy += 0.5; bird.y += bird.vy;
  if(frames%90===0){ const gap=110; const min=60; const top = min + Math.random()*(h-2*min-gap); pipes.push({x:w,top:top}); }
  for(const p of pipes){ p.x -= 2; }
  if(pipes.length && pipes[0].x < -50) { pipes.shift(); score++; scoreEl.textContent = score; }
  // collision
  if(bird.y > h || bird.y < 0) over=true;
  for(const p of pipes){ if(bird.x+12 > p.x && bird.x-12 < p.x+40){ if(bird.y-12 < p.top || bird.y+12 > p.top+110) over=true; } }

  draw();
  if(!over) requestAnimationFrame(loop); else scoreEl.textContent = 'Game Over: '+score;
}

function draw(){ ctx.clearRect(0,0,w,h); // bird
  ctx.fillStyle='yellow'; ctx.beginPath(); ctx.arc(bird.x,bird.y,12,0,Math.PI*2); ctx.fill();
  // pipes
  ctx.fillStyle='green'; for(const p of pipes){ ctx.fillRect(p.x,0,40,p.top); ctx.fillRect(p.x,p.top+110,40,h-p.top-110); }
}

window.addEventListener('keydown', ()=>{ bird.vy = -6; if(!over && frames===0) loop(); if(over){ reset(); loop(); } });
canvas.addEventListener('click', ()=>{ bird.vy=-6; if(!over && frames===0) loop(); if(over){ reset(); loop(); } });

reset();
