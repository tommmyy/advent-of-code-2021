import {
  F,
  compose,
  head,
  includes,
  map,
  o,
  replace,
  split,
  splitEvery,
  tail,
  times,
} from 'ramda';

const sanitizeToNumber = o(Number, replace(/\s+/g, ''));
const parseBoard = map(
  o(
    map(sanitizeToNumber), //
    split(/\s+/),
  ),
);
const boardStateInitial = () => times(() => times(F, 5), 5);

const markBoard = (drawnNumber, board, state) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      state[i][j] = state[i][j] || board[i][j] === drawnNumber;
    }
  }
};

const calculateWinnerScore = (drawnNumber, board, state) => {
  let score = 0;
  let winner = false;

  for (let i = 0; i < board.length; i++) {
    let row = true;
    let col = true;

    for (let j = 0; j < board[i].length; j++) {
      row = row && state[i][j];
      col = col && state[j][i];

      // console.log(row, col);

      score += state[i][j] ? 0 : board[i][j];
    }

    winner = winner || row || col;
  }
  // if (winner) {
  //   console.log({ winner, score, drawnNumber });
  // }

  return winner ? score * drawnNumber : null;
};

export const squid = data => {
  const drawnNumbers = compose(map(sanitizeToNumber), split(','), head)(data);
  const boards = compose(map(parseBoard), splitEvery(5), tail)(data);

  const boardsState = times(boardStateInitial, boards.length);
  let winnerScore = null;

  for (let i = 0; winnerScore == null && i < drawnNumbers.length; i++) {
    const drawnNumber = drawnNumbers[i];

    for (let j = 0; winnerScore == null && j < boards.length; j++) {
      markBoard(drawnNumber, boards[j], boardsState[j]);

      winnerScore = calculateWinnerScore(
        drawnNumber,
        boards[j],
        boardsState[j],
      );
    }
  }

  return winnerScore;
};

export const squidLast = data => {
  const drawnNumbers = compose(map(sanitizeToNumber), split(','), head)(data);
  const boards = compose(map(parseBoard), splitEvery(5), tail)(data);

  const boardsState = times(boardStateInitial, boards.length);
  let lastWinnerScore = null;
  const winners = [];

  for (let i = 0; i < drawnNumbers.length; i++) {
    const drawnNumber = drawnNumbers[i];

    for (let j = 0; j < boards.length; j++) {
      if (includes(j, winners)) {
        continue;
      }

      markBoard(drawnNumber, boards[j], boardsState[j]);

      const winnerScore = calculateWinnerScore(
        drawnNumber,
        boards[j],
        boardsState[j],
      );

      if (winnerScore) {
        winners.push(j);
        lastWinnerScore = winnerScore;
      }
    }
  }

  return lastWinnerScore;
};
