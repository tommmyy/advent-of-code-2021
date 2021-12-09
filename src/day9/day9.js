import {
  compose,
  filter,
  find,
  forEach,
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

const getN = ([x, y], data) => [
  getPoint(x, y - 1, data),
  getPoint(x + 1, y, data),
  getPoint(x, y + 1, data),
  getPoint(x - 1, y, data),
];
const getValue = unless(isNil, ([, , value]) => value);

const getPointByNeigborhood = (point, fn, data) => fn(getN(point, data));

const getLowestNeigbour = (point, data) =>
  getPointByNeigborhood(
    point,
    neigborhood =>
      compose(
        reduce(min, Infinity),
        filter(x => x != null),
        map(getValue),
      )(neigborhood),
    data,
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

export const vulcanoTubes = data => {
  const lows = getLows(data);

  return (
    compose(
      sum,
      map(x => x[2]),
    )(lows) + lows.length
  );
};

const findBasin = (lowPoint, data) => {
  const visited = [];
  const todo = [lowPoint];
  const i = 0;

  while (todo.length) {
    const point = todo.shift();
    const value = getValue(point);

    visited.push(point);

    const N = compose(
      filter(
        p =>
          p != null &&
          getValue(p) > value &&
          getValue(p) < 9 &&
          !find(([x, y]) => p[0] === x && p[1] === y, visited) &&
          !find(([x, y]) => p[0] === x && p[1] === y, todo),
      ),
      point => getN(point, data),
    )(point);

    todo.push(...N);
  }
  return visited;
};

export const vulcanoTubes2 = data => {
  const lows = getLows(data);
  const basins = [];

  forEach(lowPoint => {
    basins.push(findBasin(lowPoint, data));
  })(lows);

  return compose(
    reduce(multiply, 1),
    take(3),
    x => [...x].sort((a, b) => b - a),
    map(length),
  )(basins);
};
