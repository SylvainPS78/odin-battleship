import Gameboard from "./gameBoard.js";

class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type; // "real" or "computer"
    this.gameboard = new Gameboard();
    this.gameboard.initializeBoard();
  }
}

export default Player;
