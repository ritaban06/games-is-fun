const root = document.getElementById('rps');
let playerScore = 0;
let compScore = 0;

function init() {
	root.innerHTML = '';
	const scoreEl = document.createElement('div');
	scoreEl.className = 'score';
	scoreEl.innerHTML = `You: <span id="p">0</span> - <span id="c">0</span> :Computer`;
	root.appendChild(scoreEl);

	const choices = ['rock', 'paper', 'scissors'];
	const buttons = document.createElement('div');
	buttons.className = 'choices';
	choices.forEach((ch) => {
		const btn = document.createElement('button');
		btn.textContent = ch;
		btn.addEventListener('click', () => play(ch));
		buttons.appendChild(btn);
	});
	root.appendChild(buttons);

	const result = document.createElement('div');
	result.id = 'result';
	result.className = 'result';
	root.appendChild(result);
}

function play(player) {
	const choices = ['rock','paper','scissors'];
	const comp = choices[Math.floor(Math.random()*3)];
	let text = `You chose ${player}. Computer chose ${comp}. `;
	if (player === comp) text += 'Draw!';
	else if (
		(player === 'rock' && comp === 'scissors') ||
		(player === 'paper' && comp === 'rock') ||
		(player === 'scissors' && comp === 'paper')
	) { playerScore++; text += 'You win!'; }
	else { compScore++; text += 'You lose!'; }
	document.getElementById('p').textContent = playerScore;
	document.getElementById('c').textContent = compScore;
	document.getElementById('result').textContent = text;
}

init();