import {
  compose,
  curry,
  filter,
  length,
  map,
  o,
  reduce,
  split,
  trim,
} from 'ramda';

const isUndefined = x => typeof x === 'undefined';

const inc = v => (!v ? 1 : v + 1);

const addPoint = (data, y, x, getV = inc) => {
  if (isUndefined(data[y])) {
    data[y] = {};
  }
  data[y][x] = getV(data[y][x]);
};

const parseInput = map(
  compose(
    map(compose(map(o(Number, trim)), split(','))), //
    split('->'),
  ),
);

const addToGridDiagonal = curry((data, [a, b]) => {
  const start = a[0] < b[0] ? a : b;
  const end = start === a ? b : a;

  const stepX = start[0] === end[0] ? 0 : 1;
  const stepY = start[1] === end[1] ? 0 : start[1] < end[1] ? 1 : -1;

  for (
    let x = start[0], y = start[1];
    x <= end[0] && (stepY === -1 ? y >= end[1] : y <= end[1]);
    x += stepX, y += stepY
  ) {
    addPoint(data, y, x);
  }
  return data;
});

const addToGrid = curry((data, [start, end]) => {
  const [x1, y1] = start;
  const [x2, y2] = end;

  if (x1 === x2) {
    for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
      addPoint(data, i, x1);
    }
  } else if (y1 === y2) {
    for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
      addPoint(data, y1, i);
    }
  }
  return data;
});

const getPoints = data => {
  const result = [];
  for (const y in data) {
    if (data.hasOwnProperty(y)) {
      for (const x in data[y]) {
        if (data[y].hasOwnProperty(x)) {
          result.push([Number(x), Number(y), data[y][x]]);
        }
      }
    }
  }
  return result;
};

const getHydrotermalVenture = reducer => data =>
  compose(
    length,
    filter(([, , n]) => n > 1),
    getPoints,
    reduce(reducer, {}),
    parseInput,
  )(data);

export const hydrotermalVenture = getHydrotermalVenture(addToGrid);
export const hydrotermalVentureDiagonal =
  getHydrotermalVenture(addToGridDiagonal);
