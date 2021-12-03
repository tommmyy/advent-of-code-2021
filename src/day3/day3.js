import { compose, converge, curry, join, map, multiply, reduce } from 'ramda';

const binaryStringToNumber = x => Number(`0b${x}`);
const getOp = a => ~(2 * a) + 2; // 1 –> -1, 0 -> 1
const binaryStringToList = b => b.split('').map(Number);
const listToNumber = compose(binaryStringToNumber, join(''));

export const binaryDiagnostic = data =>
  compose(
    a => {
      const epsilon = [];
      const gamma = [];

      for (let i = 0, l = a.length; i < l; i++) {
        epsilon[i] = Number(a[i] > 0);
        gamma[i] = Number(!epsilon[i]);
      }
      return listToNumber(epsilon) * listToNumber(gamma);
    },
    reduce((a, b) => {
      const num = binaryStringToList(b);
      const result = [];
      for (let i = 0, l = num.length; i < l; i++) {
        result[i] = (a[i] || 0) + getOp(num[i]);
      }
      return result;
    }, []),
  )(data);

/**
 * @returns {number} if there is equal number of bits returns nil
 */
const getMostCommonBit = (data, pos) => {
  let result = 0;
  for (let i = 0; i < data.length; i++) {
    result += getOp(data[i][pos]);
  }
  return result === 0 ? null : Number(result < 0);
};

const getRating = curry((filterFn, data) => {
  let result = data;
  let pos = 0;

  while (result.length > 1) {
    const commonBit = getMostCommonBit(result, pos);
    // eslint-disable-next-line no-loop-func
    result = result.filter(x => filterFn(x[pos], commonBit));
    pos++;
  }

  return listToNumber(result[0]);
});

export const lifeSupport = compose(
  converge(multiply, [
    getRating((num, commonBit) => num === (commonBit == null ? 1 : commonBit)),
    getRating(
      (num, commonBit) => num === (commonBit == null ? 0 : Number(!commonBit)),
    ),
  ]),
  map(binaryStringToList),
);
