import Ship from "./ship.js";

class Gameboard {
  constructor(board, shipList = {}) {
    this.board = board;
    this.shipList = shipList;
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

  placeValid(row, col, length, orientation) {
    let placeValid = true;

    if (row < 0 || row > 9 || col < 0 || col > 9) {
      placeValid = false;
      return placeValid;
    }

    if (orientation === "X") {
      for (let i = 0; i < length; i++) {
        if (col + i > 9) {
          placeValid = false;
          return placeValid;
        } else if (this.board[row * 10 + (col + i)].ship !== null) {
          placeValid = false;
          return placeValid;
        }
      }
    } else if (orientation === "Y") {
      for (let i = 0; i < length; i++) {
        if (row - i < 0) {
          placeValid = false;
          return placeValid;
        } else if (this.board[(row - i) * 10 + col].ship !== null) {
          placeValid = false;
          return placeValid;
        }
      }
    }
    return placeValid;
  }

  placeShip(row, col, length, orientation, shipName) {
    if (!this.placeValid(row, col, length, orientation)) {
      return;
    } else {
      let newShip = new Ship(length, shipName);
      this.shipList[shipName] = newShip;

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

  receiveAttack(row, col) {
    const targetSquare = this.board[row * 10 + col];
    if (targetSquare.hit) {
      return { result: "already_hit", hit: false };
    }

    targetSquare.hit = true;

    if (targetSquare.ship) {
      const hitShip = this.shipList[targetSquare.ship];

      hitShip.hit();
      const isSunk = hitShip.isSunk();

      return {
        result: isSunk ? "sunk" : "hit",
        hit: true,
        shipName: targetSquare.ship,
        sunk: isSunk,
      };
    }
    return { result: "miss", hit: false };
  }
}

export default Gameboard;
