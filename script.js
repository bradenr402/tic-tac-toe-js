// Gameboard IIFE
const gameBoard = (() => {
  const spaces = document.querySelectorAll('.space');
  const board = Array(9).fill(null);

  return { board, spaces };
})();

// Game IIFE
const Game = (() => {
  const winModal = document.getElementById('win-modal');
  const winModalText = document.getElementById('win-modal-text');
  const turnDisplay = document.getElementById('turn');
  let turn = '×';

  const switchTurn = () => {
    turn = turn === '×' ? '⭘' : '×';
    gameBoard.spaces.forEach((space) => {
      space.dataset.turn = turn;
    });
  };

  const checkWin = () => {
    let winningLines = [
      [gameBoard.board[0], gameBoard.board[3], gameBoard.board[6]],
      [gameBoard.board[1], gameBoard.board[4], gameBoard.board[7]],
      [gameBoard.board[2], gameBoard.board[5], gameBoard.board[8]],
      [gameBoard.board[0], gameBoard.board[1], gameBoard.board[2]],
      [gameBoard.board[3], gameBoard.board[4], gameBoard.board[5]],
      [gameBoard.board[6], gameBoard.board[7], gameBoard.board[8]],
      [gameBoard.board[0], gameBoard.board[4], gameBoard.board[8]],
      [gameBoard.board[2], gameBoard.board[4], gameBoard.board[6]],
    ];

    let gameOver = false;
    for (let i = 0; i < winningLines.length; i++) {
      const line = winningLines[i];

      if (
        line.every((space) => space === '×') ||
        line.every((space) => space === '⭘')
      ) {
        winModal.style.display = 'flex';
        gameOver = true;

        if (turn === '×') winModalText.textContent = 'O wins!';
        else winModalText.textContent = 'X wins!';
      }
    }

    if (gameBoard.board.every((value) => value !== null) && !gameOver) {
      winModalText.textContent = 'Tie!';
      winModal.style.backgroundColor = 'rgba(138, 150, 27, 0.616)';
      winModal.style.display = 'flex';
    }
  };

  for (let i = 0; i < gameBoard.spaces.length; i++) {
    const spaces = document.querySelectorAll('.space');

    spaces[i].addEventListener('click', () => {
      if (gameBoard.board[i] === null) {
        gameBoard.board[i] = turn;
        spaces[i].textContent = turn;
        switchTurn();
        // turnDisplay.textContent = `${turn.toUpperCase()}'s Turn`;
        turnDisplay.style.color = 'rgb(30, 30, 30)';

        if (turn === '×') turnDisplay.textContent = "X's Turn";
        else turnDisplay.textContent = "O's Turn";
      } else {
        turnDisplay.textContent =
          'That space has already been taken! Please choose another space.';
        turnDisplay.style.color = 'rgb(240, 0, 60)';
      }

      checkWin();
    });
  }
})();

const reset = () => {
  location.reload();
};

const restartBtn = document.querySelector('.restart-btn');
restartBtn.addEventListener('click', reset);

const newGameBtn = document.querySelector('.new-game-btn');
newGameBtn.addEventListener('click', () => {
  location.reload();
});
