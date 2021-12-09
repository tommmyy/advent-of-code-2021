import {
  add,
  compose,
  converge,
  curry,
  filter,
  find,
  isNil,
  length,
  map,
  min,
  multiply,
  reduce,
  sum,
  take,
  unless,
} from 'ramda';

const getPoint = (x, y, data) => {
  try {
    return [x, y, data[y][x]];
  } catch (_error) {}
};
const getThreeLargest = compose(take(3), xs => [...xs].sort((a, b) => b - a));

const isSamePoint =
  ([x1, y1]) =>
  ([x2, y2]) =>
    x1 === x2 && y1 === y2;

const getN = ([x, y], data) => [
  getPoint(x, y - 1, data),
  getPoint(x + 1, y, data),
  getPoint(x, y + 1, data),
  getPoint(x - 1, y, data),
];

const getValue = unless(isNil, ([, , value]) => value);
const getPointByN = curry((fn, point, data) => fn(getN(point, data)));
const getLowestNeigbour = getPointByN(
  compose(
    reduce(min, Infinity),
    filter(x => x != null),
    map(getValue),
  ),
);

const getLows = data => {
  const lows = [];
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      const point = getPoint(x, y, data);
      const value = getValue(point);

      if (getLowestNeigbour(point, data) > value) {
        lows.push(point);
      }
    }
  }
  return lows;
};

const findBasin = (lowPoint, data) => {
  const visited = [];
  const todo = [lowPoint];

  while (todo.length) {
    const point = todo.shift();
    const value = getValue(point);

    visited.push(point);

    const N = filter(p => {
      if (p != null) {
        const compareP = find(isSamePoint(p));
        const valueP = getValue(p);

        return (
          valueP > value && valueP < 9 && !compareP(visited) && !compareP(todo)
        );
      }
    }, getN(point, data));

    todo.push(...N);
  }
  return visited;
};

export const vulcanoTubes = compose(
  converge(add, [compose(sum, map(getValue)), length]),
  getLows,
);

export const vulcanoTubes2 = data =>
  compose(
    reduce(multiply, 1),
    getThreeLargest,
    map(compose(length, lowPoint => findBasin(lowPoint, data))),
    getLows,
  )(data);
