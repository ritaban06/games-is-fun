const games = [
  {
    name: "Tic Tac Toe",
    path: "games/tictactoe/index.html",
  },
  {
    name: "Snake Game",
    path: "games/snake/index.html",
  },
  {
    name: "Memory Game",
    path: "games/memory/index.html",
  },
  {
    name: "Pong Game",
    path: "games/pong/index.html",
  },
  {
    name: "Breakout Game",
    path: "games/breakout/index.html",
  },
  {
    name: "2048 Game",
    path: "games/2048/index.html",
  },
  {
    name: "Whack-a-Mole",
    path: "games/whackamole/index.html",
  },
  {
    name: "Rock Paper Scissors",
    path: "games/rockpaperscissors/index.html",
  },
  {
    name: "Minesweeper",
    path: "games/minesweeper/index.html",
  },
  {
    name: "Connect Four",
    path: "games/connectfour/index.html",
  },
  {
    name: "Simon",
    path: "games/simon/index.html",
  },
  {
    name: "Hangman",
    path: "games/hangman/index.html",
  },
  {
    name: "Flappy",
    path: "games/flappybird/index.html",
  },
];

const container = document.getElementById("games-container");

games.forEach((game) => {
  const card = document.createElement("div");
  card.className = "game-card";
  card.innerHTML = `
    <h3>${game.name}</h3>
    <a href="${game.path}" target="_blank">▶️ Play</a>
  `;
  container.appendChild(card);
});