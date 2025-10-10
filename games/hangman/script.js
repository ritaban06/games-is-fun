const words = ['javascript','computer','canvas','rocket','puzzle','hangman'];
const newBtn = document.getElementById('new');
const wordEl = document.getElementById('word');
const lettersEl = document.getElementById('letters');
const statusEl = document.getElementById('status');

let word, revealed, mistakes;

function newGame(){
  word = words[Math.floor(Math.random()*words.length)];
  revealed = Array(word.length).fill(false);
  mistakes = 0; statusEl.textContent='';
  renderLetters(); renderWord();
}

function renderWord(){ wordEl.textContent = word.split('').map((ch,i)=> revealed[i]? ch : '_').join(' '); }

function renderLetters(){ lettersEl.innerHTML='';
  for(let i=0;i<26;i++){ const ch=String.fromCharCode(97+i); const b=document.createElement('div'); b.className='letter'; b.textContent=ch; b.addEventListener('click', ()=>guess(ch,b)); lettersEl.appendChild(b); }
}

function guess(ch, btn){ btn.style.pointerEvents='none'; if(word.includes(ch)){ for(let i=0;i<word.length;i++) if(word[i]===ch) revealed[i]=true; renderWord(); if(revealed.every(Boolean)) statusEl.textContent='You win!'; }
  else { mistakes++; if(mistakes>6) { statusEl.textContent='You lose! Word: '+word; revealAll(); } }
}

function revealAll(){ revealed = revealed.map((v,i)=> true); renderWord(); }

newBtn.addEventListener('click', newGame);
newGame();
