const board = [];
const boardWidth = 26,
  boardHeight = 16;

var snakeX;
var snakeY;
var snakeLength;
var snakeDirection;

function initGame() {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = "";

  for (var y = 0; y < boardHeight; ++y) {
    var row = [];
    for (var x = 0; x < boardWidth; ++x) {
      var cell = {};

      // Create a <div></div> and store it in the cell object
      cell.element = document.createElement("div");

      // Add it to the board
      boardElement.appendChild(cell.element);

      // Add to list of all
      row.push(cell);
    }

    // Add this row to the board
    board.push(row);
  }
}

function start() {
  startGame();
  gameLoop();
}

function startGame() {
  // Default position for the snake in the middle of the board.
  snakeX = Math.floor(boardWidth / 2);
  snakeY = Math.floor(boardHeight / 2);
  snakeLength = 5;
  snakeDirection = "Up";

  // Clear board
  for (var y = 0; y < boardHeight; ++y) {
    for (var x = 0; x < boardWidth; ++x) {
      board[y][x].snake = 0;
      board[y][x].apple = 0;
    }
  }

  // Set the center of the board to contain a snake
  board[snakeY][snakeX].snake = snakeLength;

  // Place the first apple on the board.
  placeApple();
}

function gameLoop() {
  // Update position depending on which direction the snake is moving.
  switch (snakeDirection) {
    case "Up":
      snakeY--;
      break;
    case "Down":
      snakeY++;
      break;
    case "Left":
      snakeX--;
      break;
    case "Right":
      snakeX++;
      break;
  }

  // Check for walls, and restart if we collide with any
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= boardWidth ||
    snakeY >= boardHeight
  ) {
    initGame();
  }
  // Collect apples
  if (board[snakeY][snakeX].apple === 1) {
    snakeLength++;
    board[snakeY][snakeX].apple = 0;
    placeApple();
  }
  // Tail collision
  if (board[snakeY][snakeX].snake > 0) {
    initGame();
  }

  // Update the board at the new snake position
  board[snakeY][snakeX].snake = snakeLength;

  // Loop over the entire board, and update every cell
  for (var y = 0; y < boardHeight; ++y) {
    for (var x = 0; x < boardWidth; ++x) {
      var cell = board[y][x];

      if (cell.snake > 0) {
        cell.element.className = "snake";
        cell.snake -= 1;
      } else if (cell.apple === 1) {
        cell.element.className = "apple";
      } else {
        cell.element.className = "";
      }
    }
  }

  // This function calls itself, with a timeout of 1000 milliseconds
  setTimeout(gameLoop, 1000 / snakeLength);
}

function enterKey(event) {
  // Update direction depending on key hit
  console.log(event.key);
  switch (event.key) {
    case "ArrowUp":
      if (snakeDirection !== "Down") {
        snakeDirection = "Up";
      }
      break;
    case "ArrowDown":
      if (snakeDirection !== "Up") {
        snakeDirection = "Down";
      }
      break;
    case "ArrowLeft":
      if (snakeDirection !== "Right") {
        snakeDirection = "Left";
      }
      break;
    case "ArrowRight":
      if (snakeDirection !== "Left") {
        snakeDirection = "Right";
      }
      break;
    default:
      // document.querySelector("input").value += event.key;
      break;
  }

  // This prevents the arrow keys from scrolling the window
  event.preventDefault();
}

function placeApple() {
  // A random coordinate for the apple
  var appleX = Math.floor(Math.random() * boardWidth);
  var appleY = Math.floor(Math.random() * boardHeight);

  board[appleY][appleX].apple = 1;
}

function setHighscore() {
  document.querySelector("body").addEventListener("keyup", enterKey);
  document.querySelector(".sannie").innerText = document.querySelector(
    "#fname"
  ).value;
}
