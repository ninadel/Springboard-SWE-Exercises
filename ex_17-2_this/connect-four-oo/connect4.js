// PART 1: Make game into a class
// PART 2: Small improvements

class Game {
  constructor(p1, p2, height = 7, width = 6) {
    this.players = [p1, p2];
    this.HEIGHT = height;
    this.WIDTH = width;
    this.currPlayer = p1;
    this.board = [];
    this.makeBoard();
    this.makeHtmlBoard();
    this.gameOver = false;
    this.p1Color = p1.color;
    this.p2Color = p2.color;
  }

  // todo
  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }

  // todo
  makeHtmlBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");

    // Q: bind?
    // store a reference to the handleClick bound function
    // so that we can remove the event listener correctly later
    this.handleGameClick = this.handleClick.bind(this);

    top.addEventListener("click", this.handleGameClick);

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement("tr");

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.top = -50 * (y + 2);
    if (this.currPlayer === this.players[0]) {
      piece.style.backgroundColor = this.p1Color;
    } else {
      piece.style.backgroundColor = this.p2Color;
    }
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    alert(msg);
    this.gameOver = true;
  }

  handleClick(evt) {
    if (!this.gameOver) {
      // get x from ID of clicked cell
      const x = +evt.target.id;

      // get next spot in column (if none, ignore click)
      const y = this.findSpotForCol(x);
      if (y === null) {
        return;
      }

      // place piece in board and add to HTML table
      this.board[y][x] = this.currPlayer;
      this.placeInTable(y, x);

      // check for win
      if (this.checkForWin()) {
        return this.endGame(`${this.currPlayer.color} won!`);
      }

      // check for tie
      if (this.board.every((row) => row.every((cell) => cell))) {
        return this.endGame("Tie!");
      }

      // switch players
      this.currPlayer =
        this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
    }
  }

  checkForWin() {
    const _win = (cells) => {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer

      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    };

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

// a class to represent instances of a Player object
// each Game includes two instances of Player
class Player {
  constructor(color) {
    this.color = color;
  }
}

// this function validates whether a string is a valid color name string or hexadecimal
function isValidColor(color) {
  const s = new Option().style;
  s.color = color;
  if (s.color == color.toLowerCase()) {
    return true;
  } else {
    return isHexColor(color);
  }
}

// this function validates whether a string is a valid hexadecimal
function isHexColor(hex) {
  const hexValue = hex.slice(1);
  return (
    typeof hexValue === "string" &&
    hexValue.length === 6 &&
    !isNaN(Number("0x" + hexValue))
  );
}

// this function initiates a new connect 4 game
function startNewGame() {
  let validColors = false;
  let player1 = null;
  let player2 = null;
  const p1Color = document.getElementById("p1-color").value;
  const p2Color = document.getElementById("p2-color").value;
  // if both colors provided by user are valid and not equal
  if (
    isValidColor(p1Color) &&
    isValidColor(p2Color) &&
    !(p1Color === p2Color)
  ) {
    validColors = true;
  }
  // if combination of colors provided are not valid
  if (!validColors) {
    // create 2 player instances and revert to default color values to start game
    player1 = new Player("red");
    player2 = new Player("blue");
    const newGame = new Game(player1, player2, 7, 6);
  } else {
    // create 2 player instances and use user provided color values to start game
    player1 = new Player(p1Color);
    player2 = new Player(p2Color);
    const newGame = new Game(player1, player2, 7, 6);
  }
}

// on page load, add an event listener to the button which calls startNewGame
document.addEventListener("DOMContentLoaded", function () {
  const startButton = this.querySelector("#start");
  startButton.addEventListener("click", startNewGame);
});
