class Ship {
  constructor(lenght, name, hitNumber = 0, sunk = false) {
    this.lenght = lenght;
    this.name = name;
    this.hitNumber = hitNumber;
    this.sunk = sunk;
  }

  hit() {
    this.hitNumber++;
    return this.hitNumber;
  }

  isSunk() {
    if (this.hitNumber >= this.lenght) {
      this.sunk = true;
    }
    return this.sunk;
  }
}

export default Ship;
