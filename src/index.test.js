import Ship from "./js/ship.js";
import Gameboard from "./js/gameBoard.js";

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
  console.log(testGameboard);
});

test("Ship horizontal fail test", () => {
  testGameboard.placeShip(3, 9, 2, "X", "ErrorShip");

  expect(testGameboard.board[39].ship).toBe(null);
});

test("Ship vertical fail test", () => {
  testGameboard.placeShip(2, 2, 4, "Y", "ErrorShip2");

  expect(testGameboard.board[22].ship).toBe(null);
  expect(testGameboard.board[12].ship).toBe(null);
});

test("Collision fail test", () => {
  testGameboard.placeShip(5, 5, 3, "Y", "ErrorShip3");

  expect(testGameboard.board[55].ship).toBe(null);
  expect(testGameboard.board[45].ship).toBe(null);
  expect(testGameboard.board[35].ship).toBe("testName");
});

test("index fail test", () => {
  testGameboard.placeShip(10, 1, 1, "Y", "ErrorShip4");
  expect(testGameboard.placeValid(10, 1, 1, "Y")).toBe(false);
});

test("Attack test", () => {
  testGameboard.receiveAttack(3, 4);
  expect(testGameboard.shipList.testName.hitNumber).toBe(1);
  expect(testGameboard.shipList.testName.sunk).toBe(false);
  testGameboard.receiveAttack(3, 7);
  testGameboard.receiveAttack(3, 3);
  testGameboard.receiveAttack(3, 6);
  testGameboard.receiveAttack(3, 5);
  expect(testGameboard.board[34].hit).toBe(true);
  expect(testGameboard.board[32].hit).toBe(false);
  expect(testGameboard.shipList.testName.hitNumber).toBe(5);
  expect(testGameboard.shipList.testName.sunk).toBe(true);
  console.log(testGameboard);
});
