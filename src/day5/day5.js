import { compose, filter, forEach, length, map, o, split, trim } from 'ramda';

const isUndefined = x => typeof x === 'undefined';

const inc = v => (!v ? 1 : v + 1);

const addCoords = (data, y, x, getV = inc) => {
  if (isUndefined(data[y])) {
    data[y] = {};
  }
  data[y][x] = getV(data[y][x]);
};

const createGrid = () => {
  const data = {};

  return {
    add([start, end]) {
      const [x1, y1] = start;
      const [x2, y2] = end;

      if (x1 === x2) {
        for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
          addCoords(data, i, x1);
        }
      } else if (y1 === y2) {
        for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
          addCoords(data, y1, i);
        }
      } else {
      }
    },
    getPoints() {
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
    },
  };
};

const createGridDiagonal = () => {
  const data = {};

  return {
    add([a, b]) {
      const start = a[0] < b[0] ? a : b;
      const end = start === a ? b : a;

      const stepX = start[0] === end[0] ? 0 : 1;
      const stepY = start[1] === end[1] ? 0 : start[1] < end[1] ? 1 : -1;

      for (
        let x = start[0], y = start[1];
        x <= end[0] && (stepY === -1 ? y >= end[1] : y <= end[1]);
        x += stepX, y += stepY
      ) {
        addCoords(data, y, x);
      }
    },
    getPoints() {
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
    },
  };
};

export const hydrotermalVenture = data => {
  // 0,9 -> 5,9
  const i = map(
    compose(
      map(compose(map(o(Number, trim)), split(','))), //
      split('->'),
    ),
  )(data);

  const grid = createGrid();

  forEach(points => grid.add(points), i);

  const points = grid.getPoints();

  return compose(
    length,
    filter(([, , n]) => n > 1),
  )(points);
};

export const hydrotermalVentureDiagonal = data => {
  const grid = createGridDiagonal();

  compose(
    forEach(points => grid.add(points)),
    map(
      compose(
        map(compose(map(o(Number, trim)), split(','))), //
        split('->'),
      ),
    ),
  )(data);

  const points = grid.getPoints();

  return compose(
    length,
    filter(([, , n]) => n > 1),
  )(points);
};
