import "./styles.css";
import Ship from "./js/ship.js";
import Gameboard from "./js/gameBoard.js";
import player from "./js/player.js";
import { displayGameBoards } from "./js/DOMmethods.js";

let player1 = new player("Player test", "real");
let player2 = new player("Computer", "computer");

displayGameBoards(player1, player2);
