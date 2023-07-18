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
    console.log("makeBoard()");
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }

  // todo
  makeHtmlBoard() {
    console.log("makeHtmlBoard()");

    const board = document.getElementById("board");
    // const pieceP1 = document.getElementsByClassName(".piece.p1");
    // pieceP1.style.backgroundColor = this.p1Color;
    // const pieceP2 = document.getElementsByClassName(".piece.p2");
    // pieceP1.style.backgroundColor = this.p2Color;
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
    // piece.classList.add(`${this.currPlayer}`);
    piece.style.top = -50 * (y + 2);
    console.log("player", this.currPlayer);
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
    console.log("gameOver", this.gameOver);
    if (!this.gameOver) {
      console.log("handleClick");
      // get x from ID of clicked cell
      const x = +evt.target.id;

      // get next spot in column (if none, ignore click)
      // Q: bug?
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
          // Q: does this need to be bound?
          y < this.HEIGHT &&
          x >= 0 &&
          // Q: does this need to be bound?
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

class Player {
  constructor(color) {
    this.color = color;
  }
}

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// const WIDTH = 7;
// const HEIGHT = 6;

// let currPlayer = 1; // active player: 1 or 2
// let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */

// move to Game class
// function makeBoard() {
//   for (let y = 0; y < HEIGHT; y++) {
//     board.push(Array.from({ length: WIDTH }));
//   }
// }

/** makeHtmlBoard: make HTML table and row of column tops. */

// move to Game class
// function makeHtmlBoard() {
//   const board = document.getElementById("board");

//   // make column tops (clickable area for adding a piece to that column)
//   const top = document.createElement("tr");
//   top.setAttribute("id", "column-top");
//   top.addEventListener("click", handleClick);

//   for (let x = 0; x < WIDTH; x++) {
//     const headCell = document.createElement("td");
//     headCell.setAttribute("id", x);
//     top.append(headCell);
//   }

//   board.append(top);

//   // make main part of board
//   for (let y = 0; y < HEIGHT; y++) {
//     const row = document.createElement("tr");

//     for (let x = 0; x < WIDTH; x++) {
//       const cell = document.createElement("td");
//       cell.setAttribute("id", `${y}-${x}`);
//       row.append(cell);
//     }

//     board.append(row);
//   }
// }

/** findSpotForCol: given column x, return top empty y (null if filled) */

// move to Game class
// function findSpotForCol(x) {
//   for (let y = HEIGHT - 1; y >= 0; y--) {
//     if (!board[y][x]) {
//       return y;
//     }
//   }
//   return null;
// }

/** placeInTable: update DOM to place piece into HTML table of board */

// move to Game class
// function placeInTable(y, x) {
//   const piece = document.createElement("div");
//   piece.classList.add("piece");
//   piece.classList.add(`p${currPlayer}`);
//   piece.style.top = -50 * (y + 2);

//   const spot = document.getElementById(`${y}-${x}`);
//   spot.append(piece);
// }

/** endGame: announce game end */

// move to Game class
// function endGame(msg) {
//   alert(msg);
// }

/** handleClick: handle click of column top to play piece */

// move to Game class
// function handleClick(evt) {
//   // get x from ID of clicked cell
//   const x = +evt.target.id;

//   // get next spot in column (if none, ignore click)
//   const y = findSpotForCol(x);
//   if (y === null) {
//     return;
//   }

//   // place piece in board and add to HTML table
//   board[y][x] = currPlayer;
//   placeInTable(y, x);

//   // check for win
//   if (checkForWin()) {
//     return endGame(`Player ${currPlayer} won!`);
//   }

//   // check for tie
//   if (board.every((row) => row.every((cell) => cell))) {
//     return endGame("Tie!");
//   }

//   // switch players
//   currPlayer = currPlayer === 1 ? 2 : 1;
// }

/** checkForWin: check board cell-by-cell for "does a win start here?" */

// move to Game class
// function checkForWin() {
//   function _win(cells) {
//     // Check four cells to see if they're all color of current player
//     //  - cells: list of four (y, x) cells
//     //  - returns true if all are legal coordinates & all match currPlayer

//     return cells.every(
//       ([y, x]) =>
//         y >= 0 &&
//         y < HEIGHT &&
//         x >= 0 &&
//         x < WIDTH &&
//         board[y][x] === currPlayer
//     );
//   }

//   for (let y = 0; y < HEIGHT; y++) {
//     for (let x = 0; x < WIDTH; x++) {
//       // get "check list" of 4 cells (starting here) for each of the different
//       // ways to win
//       const horiz = [
//         [y, x],
//         [y, x + 1],
//         [y, x + 2],
//         [y, x + 3],
//       ];
//       const vert = [
//         [y, x],
//         [y + 1, x],
//         [y + 2, x],
//         [y + 3, x],
//       ];
//       const diagDR = [
//         [y, x],
//         [y + 1, x + 1],
//         [y + 2, x + 2],
//         [y + 3, x + 3],
//       ];
//       const diagDL = [
//         [y, x],
//         [y + 1, x - 1],
//         [y + 2, x - 2],
//         [y + 3, x - 3],
//       ];

//       // find winner (only checking each win-possibility as needed)
//       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
//         return true;
//       }
//     }
//   }
// }

// move to Game class
// makeBoard();
// move to Game class
// makeHtmlBoard();

function isValidColor(color) {
  let s = new Option().style;
  s.color = color;
  if (s.color == color.toLowerCase()) {
    return true;
  } else {
    return isHexColor(color);
  }

  // return 'false' if color wasn't assigned
  // return s.color == strColor.toLowerCase();
}

function isHexColor(hex) {
  let hexValue = hex.slice(1);
  return (
    typeof hexValue === "string" &&
    hexValue.length === 6 &&
    !isNaN(Number("0x" + hexValue))
  );
}
function startNewGame() {
  let validColors = false;
  let p1Color = document.getElementById("p1-color").value;
  let p2Color = document.getElementById("p2-color").value;
  if (
    isValidColor(p1Color) &&
    isValidColor(p2Color) &&
    !(p1Color === p2Color)
  ) {
    validColors = true;
  }
  if (!validColors) {
    // create player
    console.log("invalid colors");
    let player1 = new Player("red");
    let player2 = new Player("blue");
    let newGame = new Game(player1, player2, 7, 6);
  } else {
    console.log("valid colors");
    let player1 = new Player(p1Color);
    let player2 = new Player(p2Color);
    let newGame = new Game(player1, player2, 7, 6);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const startButton = this.querySelector("#start");
  console.log(startButton);
  startButton.addEventListener("click", startNewGame);
});
