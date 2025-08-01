import Gameboard from "./gameBoard.js";

let gameActive = false;
let gameState = { player1: null, player2: null };
let currentPlayer = null;

function displayGameBoards(player) {
  const main = document.querySelector("main");
  let gameSection = main.querySelector(".game-section");
  if (!gameSection) {
    gameSection = document.createElement("div");
    gameSection.className = "game-section";
    main.appendChild(gameSection);
  }

  let gameContainer = gameSection.querySelector(".game-container");
  if (!gameContainer) {
    gameContainer = document.createElement("div");
    gameContainer.className = "game-container";
    gameSection.appendChild(gameContainer);
  }

  const playerSection = createPlayerSection(player, player.playerId);
  gameContainer.appendChild(playerSection);
  gameState[player.playerId] = player;
  if (!currentPlayer) currentPlayer = player;
}

function createStartButton() {
  const main = document.querySelector("main");

  if (main.querySelector(".start-button")) {
    return;
  }

  const startButton = document.createElement("button");
  startButton.className = "start-button";
  startButton.textContent = "Start Game";

  startButton.addEventListener("click", handleStartGame);

  main.appendChild(startButton);
}

function handleStartGame() {
  switchToAttackMode();
}

function switchToAttackMode() {}

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
      square.className = "board-square"; //hidden
      square.dataset.row = row;
      square.dataset.col = col;
      square.dataset.player = playerId;

      square.addEventListener("click", handlePlacementClick);

      board.appendChild(square);
    }
  }

  boardContainer.appendChild(board);
  section.appendChild(title);
  section.appendChild(boardContainer);

  return section;
}

function handlePlacementClick(event) {
  if (gameActive) return;
  const square = event.target;
  const row = parseInt(square.dataset.row);
  const col = parseInt(square.dataset.col);
  const playerId = square.dataset.player;
  const player = gameState[playerId];
  const axeButton = document.querySelector(".axe-btn");
  const orientation = axeButton.dataset.currentAxe;
  const shipButton = document.querySelector(".ship-select-btn.selected");
  if (!shipButton) return; // Must select a ship to place first
  const length = shipButton.dataset.shipLength;
  const shipName = shipButton.dataset.shipName;

  if (playerId !== currentPlayer.playerId) return; // Player can't click ennemy board

  if (player.gameboard.placeValid(row, col, length, orientation)) {
    player.gameboard.placeShip(row, col, length, orientation, shipName);
    shipButton.classList.remove("selected");
    shipButton.disabled = true;
    updateBoardDisplay(player, playerId);
  }

  console.log(player.gameboard);
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

  if (currentPlayer.type === "computer") {
    simulateComputerClick();
  }
}

function handleWin(winner) {
  const gameTitle = document.getElementById("player-turn");
  gameTitle.textContent = `Congratulation ${winner.name} you won !`;
  gameActive = false;
}

function simulateComputerClick() {
  if (currentPlayer.type !== "computer" || !gameActive) return;

  const targetPlayerId = //define board to attack
    currentPlayer.playerId === "player1" ? "player2" : "player1";
  const targetPlayer = gameState[targetPlayerId];
  const board = document.getElementById(`board-${targetPlayerId}`);

  const availableSquares = []; // Search for all available targets
  targetPlayer.gameboard.board.forEach((square, index) => {
    if (!square.hit) {
      availableSquares.push(index);
    }
  });

  if (availableSquares.length === 0) return; // should never happen

  setTimeout(() => {
    if (!gameActive) return;

    const randomIndex =
      availableSquares[Math.floor(Math.random() * availableSquares.length)];
    board.children[randomIndex].click();
  }, 750);
}

function createButtons() {
  createShipButtons();
  createAxeButton();
  createStartButton();
}

function createShipButtons() {
  const ships = [
    { name: "Destroyer", length: 2 },
    { name: "Submarine", length: 3 },
    { name: "Cruiser", length: 3 },
    { name: "Battleship", length: 4 },
    { name: "Carrier", length: 5 },
  ];

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  ships.forEach((ship) => {
    const btn = document.createElement("button");
    btn.className = "ship-select-btn";
    btn.textContent = `${ship.name} (${ship.length})`;
    btn.dataset.shipName = ship.name;
    btn.dataset.shipLength = ship.length;

    btn.addEventListener("click", (event) => {
      shipSelectBtn(event.currentTarget);
    });

    buttonContainer.appendChild(btn);
  });

  const main = document.querySelector("main");
  let gameSection = main.querySelector(".game-section");
  if (!gameSection) {
    gameSection = document.createElement("div");
    gameSection.className = "game-section";
    main.appendChild(gameSection);
  }

  if (gameSection) {
    gameSection.insertBefore(buttonContainer, gameSection.firstChild);
  }
}

function shipSelectBtn(selectedButton) {
  const shipButtons = document.querySelectorAll(".ship-select-btn");
  for (const button of shipButtons) {
    button.classList.remove("selected");
  }

  selectedButton.classList.add("selected");
}

function createAxeButton() {
  const buttonContainer = document.querySelector(".button-container");
  const btn = document.createElement("button");
  btn.className = "axe-btn";
  btn.textContent = "Axe: Horizontal";
  btn.dataset.currentAxe = "X";

  btn.addEventListener("click", (event) => {
    handleAxeButton(event.currentTarget);
  });

  buttonContainer.append(btn);
}

function handleAxeButton(axeButton) {
  axeButton.classList.toggle("selected");
  axeButton.textContent =
    axeButton.dataset.currentAxe === "X"
      ? "Axe: Vertical\u00A0\u00A0"
      : "Axe: Horizontal";
  axeButton.dataset.currentAxe =
    axeButton.dataset.currentAxe === "X" ? "Y" : "X";
}

export {
  displayGameBoards,
  updateBoardDisplay,
  createButtons,
  createStartButton,
};
