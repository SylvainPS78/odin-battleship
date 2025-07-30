import "./styles.css";
import Ship from "./js/ship.js";
import Gameboard from "./js/gameBoard.js";
import player from "./js/player.js";
import { displayGameBoards, updateBoardDisplay } from "./js/DOMmethods.js";

let player1 = new player("Player test", "real");
let player2 = new player("Computer", "computer");

displayGameBoards(player1, player2);

player1.gameboard.placeShip(0, 0, 2, "X", "Destroyer");
player1.gameboard.placeShip(5, 3, 3, "Y", "Submarine");
player1.gameboard.placeShip(8, 3, 3, "X", "Cruiser");
player1.gameboard.placeShip(7, 1, 4, "X", "Battleship");
player1.gameboard.placeShip(8, 9, 5, "Y", "Carrier");
updateBoardDisplay(player1, "player1");

player2.gameboard.placeShip(1, 5, 2, "X", "Destroyer");
player2.gameboard.placeShip(3, 1, 3, "Y", "Submarine");
player2.gameboard.placeShip(4, 2, 3, "Y", "Cruiser");
player2.gameboard.placeShip(7, 2, 4, "X", "Battleship");
player2.gameboard.placeShip(5, 4, 5, "X", "Carrier");
updateBoardDisplay(player2, "player2");
