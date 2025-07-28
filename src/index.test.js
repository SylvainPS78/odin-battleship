import Ship from "./js/ship.js";
import Gameboard from "./js/gameBoard.js";

let testShip = new Ship(1);
let testGameboard = new Gameboard();

test("Ship horizontal creation test", () => {
  testGameboard.initializeBoard();
  testGameboard.placeShip(3, 3, 5, "X", "testName");

  expect(testGameboard.board[35].ship).toBe("testName");
  expect(testGameboard.board[45].ship).toBe(null);
});

test("Ship vertical creation test", () => {
  testGameboard.placeShip(8, 8, 3, "Y", "testName2");

  expect(testGameboard.board[78].ship).toBe("testName2");
  expect(testGameboard.board[99].ship).toBe(null);
  //console.log(testGameboard.board);
});
