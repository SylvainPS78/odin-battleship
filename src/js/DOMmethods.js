import Gameboard from "./gameBoard.js";

let gameActive = true;
let gameState = { player1: null, player2: null };
let currentPlayer = null;

function displayGameBoards(player1, player2) {
  gameState.player1 = player1;
  gameState.player2 = player2;
  currentPlayer = player1;

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
      square.className = "board-square hidden";
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

function updateBoardDisplay(player, playerId) {
  const board = document.getElementById(`board-${playerId}`);

  player.gameboard.board.forEach((square, index) => {
    const domSquare = board.children[index];

    if (square.ship) {
      domSquare.classList.add("ship");
      domSquare.dataset.shipName = square.ship;
    }
    if (square.hit) {
      domSquare.classList.remove("hidden");
      domSquare.classList.add(square.ship ? "hit" : "miss");
    }
  });
}

function handleSquareClick(event) {
  if (!gameActive) return;
  const square = event.target;
  const row = parseInt(square.dataset.row);
  const col = parseInt(square.dataset.col);
  const playerId = square.dataset.player;
  const player = gameState[playerId];

  if (playerId === currentPlayer.playerId) return; // Player can't click their own board

  let attackResult = player.gameboard.receiveAttack(row, col);
  if (attackResult.result === "already_hit") return; // Player can't click twice the same square

  if (
    attackResult.result === "miss" ||
    attackResult.result === "hit" ||
    attackResult.result === "sunk"
  ) {
    player.gameboard.board[row * 10 + col].hit = true;
    updateBoardDisplay(player, playerId);

    if (attackResult.result === "sunk") {
      markShipAsSunk(player, attackResult.shipName, playerId);
      if (checkWin(player)) {
        handleWin(currentPlayer);
        return;
      }
    }
  }
  handleRound();
}

function markShipAsSunk(player, shipName, playerId) {
  const board = document.getElementById(`board-${playerId}`);

  player.gameboard.board.forEach((square, index) => {
    if (square.ship === shipName) {
      const domSquare = board.children[index];
      domSquare.classList.add("sunk");
    }
  });
}

function checkWin(player) {
  let playerWin = true;
  const playerShips = player.gameboard.shipList;

  for (const shipName in playerShips) {
    if (playerShips[shipName].sunk === false) {
      playerWin = false;
      break;
    }
  }
  return playerWin;
}

function handleRound() {
  const gameTitle = document.getElementById("player-turn");
  currentPlayer =
    currentPlayer === gameState.player1 ? gameState.player2 : gameState.player1;
  gameTitle.textContent = `Your turn ${currentPlayer.name}`;
}

function handleWin(winner) {
  const gameTitle = document.getElementById("player-turn");
  gameTitle.textContent = `Congratulation ${winner.name} you won !`;
  gameActive = false;
}

export { displayGameBoards, updateBoardDisplay };
