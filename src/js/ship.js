class Ship {
  constructor(lenght, hitNumber = 0, sunk = false) {
    this.lenght = lenght;
    this.hitNumber = hitNumber;
    this.sunk = sunk;
  }

  hit() {
    this.hitNumber++;
  }

  isSunk() {
    if (this.hitNumber >= this.lenght) {
      this.sunk = true;
    }
  }
}

export default Ship;
