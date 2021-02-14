let isPlayer1Turn = true;
let turnCount = 0;
let gameOver = false;

const grid = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const onCellClick = (y, x) => {
  const cellValue = grid[y][x];
  turnCount += 1;
  if (cellValue || gameOver) {
    return;
  }

  const symbol = isPlayer1Turn ? 'X' : 'O';

  grid[y][x] = symbol;

  const htmlCell = document.getElementById(`${y},${x}`);
  htmlCell.innerHTML = `<span class="symbol">${symbol}</span>`;

  const state = getBoardState(symbol);
  const heading = document.getElementById('heading');

  let headingText;
  if (state === 0) {
    const oppositePlayer = isPlayer1Turn ? 'Player 2' : 'Player 1';
    headingText = isPlayer1Turn
      ? `${oppositePlayer}'s turn`
      : `${oppositePlayer}'s turn`;
  } else if (state === 1) {
    const player = isPlayer1Turn ? 'Player 1' : 'Player 2';
    headingText = `${player} has won!`;
    gameOver = true;
  } else {
    headingText = "Cat's game!";
    gameOver = true;
  }

  heading.innerText = headingText;

  isPlayer1Turn = !isPlayer1Turn;
};

const getBoardState = (symbol) => {
  for (let y = 0; y < 3; y++) {
    let threeInARow = true;
    for (let x = 0; x < 3; x++) {
      if (grid[y][x] !== symbol) {
        threeInARow = false;
        break;
      }
    }

    if (threeInARow === true) {
      return 1;
    }
  }

  for (let x = 0; x < 3; x++) {
    let threeInARow = true;
    for (let y = 0; y < 3; y++) {
      if (grid[y][x] !== symbol) {
        threeInARow = false;
        break;
      }
    }

    if (threeInARow === true) {
      return 1;
    }
  }

  let diag1threeInARow = true;
  for (let i = 0; i < 3; i++) {
    if (grid[i][i] !== symbol) {
      diag1threeInARow = false;
      break;
    }
  }

  if (diag1threeInARow) {
    return 1;
  }

  let diag2threeInARow = true;
  for (let i = 0; i < 3; i++) {
    if (grid[i][2 - i] !== symbol) {
      diag2threeInARow = false;
      break;
    }
  }

  if (diag2threeInARow) {
    return 1;
  }

  if (turnCount < 8) {
    return 0;
  }

  return 2;
};

const onReset = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      grid[i][j] = null;
      const htmlCell = document.getElementById(`${i},${j}`);
      htmlCell.innerHTML = '';
    }
  }

  const heading = document.getElementById('heading');
  heading.innerText = "Player 1's turn";
  isPlayer1Turn = true;
  turnCount = 0;
  gameOver = false;
};
