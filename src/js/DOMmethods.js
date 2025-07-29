function displayGameBoards(player1, player2) {
  const main = document.querySelector("main");

  const gameContainer = document.createElement("div");
  gameContainer.className = "game-container";

  const player1Section = createPlayerSection(player1, "player1");
  const player2Section = createPlayerSection(player2, "player2");

  gameContainer.appendChild(player1Section);
  gameContainer.appendChild(player2Section);

  main.innerHTML = "";
  main.appendChild(gameContainer);
}

function createPlayerSection(player, playerId) {
  const section = document.createElement("section");
  section.className = "player-section";
  section.id = playerId;

  const title = document.createElement("h2");
  title.className = "player-title";
  title.textContent = player.name;

  const boardContainer = document.createElement("div");
  boardContainer.className = "board-container";

  const board = document.createElement("div");
  board.className = "game-board";
  board.id = `board-${playerId}`;

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const square = document.createElement("div");
      square.className = "board-square";
      square.dataset.row = row;
      square.dataset.col = col;
      square.dataset.player = playerId;

      square.addEventListener("click", handleSquareClick);

      board.appendChild(square);
    }
  }

  boardContainer.appendChild(board);
  section.appendChild(title);
  section.appendChild(boardContainer);

  return section;
}

function handleSquareClick(event) {
  const square = event.target;
  const row = parseInt(square.dataset.row);
  const col = parseInt(square.dataset.col);
  const player = square.dataset.player;

  console.log(`Case cliquée: ${player} - Ligne ${row}, Colonne ${col}`);
}

export { displayGameBoards };
