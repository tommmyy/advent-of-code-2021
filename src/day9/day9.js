import { compose, filter, min, reduce, sum } from 'ramda';

const getPoint = (x, y, data) => {
  try {
    return data[y][x];
  } catch (_error) {}
};
const getPointByNeigborhood = (x, y, fn, data) =>
  fn([
    getPoint(x, y - 1, data),
    getPoint(x + 1, y, data),
    getPoint(x, y + 1, data),
    getPoint(x - 1, y, data),
  ]);

const getLowestNeigbour = (x, y, data) =>
  getPointByNeigborhood(
    x,
    y,
    neigborhood =>
      compose(
        reduce(min, Infinity),
        filter(x => x != null),
      )(neigborhood),
    data,
  );
export const vulcanoTubes = data => {
  const lows = [];
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      const value = getPoint(x, y, data);

      if (getLowestNeigbour(x, y, data) > value) {
        lows.push(value);
      }
    }
  }

  return sum(lows) + lows.length;
};
