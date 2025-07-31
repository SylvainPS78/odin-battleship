import Gameboard from "./gameBoard.js";

class Player {
  constructor(name, type, playerId = null) {
    this.name = name;
    this.type = type; // "real" or "computer"
    this.playerId = playerId; // "player1" or "player2"
    this.gameboard = new Gameboard();
    this.gameboard.initializeBoard();
  }
}

export default Player;
