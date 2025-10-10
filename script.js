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
