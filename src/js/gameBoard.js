import Ship from "./ship.js";

class Gameboard {
  constructor(board) {
    this.board = board;
  }

  initializeBoard() {
    this.board = [];

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        let square = {
          coordinates: [row, col],
          ship: null,
          hit: false,
        };
        this.board.push(square);
      }
    }
  }

  placeShip(row, col, length, orientation, shipName) {
    let newShip = new Ship(length, shipName);

    if (orientation === "X") {
      for (let i = 0; i < length; i++) {
        this.board[row * 10 + (col + i)].ship = newShip.name;
      }
    } else if (orientation === "Y") {
      for (let i = 0; i < length; i++) {
        this.board[(row - i) * 10 + col].ship = newShip.name;
      }
    }
  }
}

export default Gameboard;
