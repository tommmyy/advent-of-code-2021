import {
  compose,
  difference,
  filter,
  find,
  findIndex,
  forEach,
  includes,
  length,
  map,
  reduce,
  sum,
} from 'ramda';
import { equalsLength, listToString } from 'ramda-extension';

const arrayEquals = y => x => listToString(x) === listToString(y);

export const sevenSegmentSearch1 = data => {
  const r = compose(
    sum,
    map(
      compose(
        length,
        filter(x => includes(x.length, [2, 4, 3, 7])),
        r => r[1],
      ),
    ),
  )(data);

  return r;
};

const getObviousNums = data =>
  [
    [1, 2],
    [4, 4],
    [7, 3],
    [8, 7],
  ].reduce(
    (acc, [index, len]) => ((acc[index] = find(equalsLength(len), data)), acc),
    Array(10).fill(null),
  );

const getA = (knownNums, segments) => {
  segments.a = difference(knownNums[7], knownNums[1])[0];
};

const get3 = (knownNums, segments, combinations) => {
  knownNums[3] = find(
    x => x.length === 5 && difference(knownNums[1], x).length === 0,
  )(combinations);
};

export const getG = (knownNums, segments) => {
  segments.g = reduce(
    difference,
    knownNums[3],
  )([knownNums[1], knownNums[4], [segments.a]])[0];
};

export const getB = (knownNums, segments) => {
  segments.b = reduce(difference, knownNums[4])([knownNums[3]])[0];
};

const get2and5 = (knownNums, segments, combinations) => {
  compose(
    ([a, b]) => {
      if (includes(segments.b, a)) {
        knownNums[5] = a;
        knownNums[2] = b;
      } else {
        knownNums[5] = b;
        knownNums[2] = a;
      }
    },
    filter(x => x.length === 5 && x !== knownNums[3]),
  )(combinations);
};

const get6 = (knownNums, segments, combinations) => {
  knownNums[6] = find(
    x => x.length === 6 && difference(knownNums[1], x).length === 1,
    combinations,
  );
  segments.c = difference(knownNums[1], knownNums[6])[0];
};

const get0and9 = (knownNums, segments, combinations) => {
  compose(
    ([a, b]) => {
      if (difference(a, knownNums[5]).length === 1) {
        knownNums[9] = a;
        knownNums[0] = b;
      } else {
        knownNums[9] = b;
        knownNums[0] = a;
      }
    },
    filter(x => x.length === 6 && x !== knownNums[6]),
  )(combinations);
};

export const solveRow = combinations => {
  const foundNums = getObviousNums(combinations);
  const segments = {};
  forEach(
    fn => fn(foundNums, segments, combinations),
    [getA, get3, getG, getB, get2and5, get6, get0and9],
  );

  return [foundNums, segments];
};

const decode = (nums, code) =>
  compose(
    Number,
    reduce((acc, num) => `${acc}${findIndex(arrayEquals(num), nums)}`, ''),
  )(code);

export const sevenSegmentSearch2 = compose(
  sum,
  map(([combinations, code]) => decode(solveRow(combinations)[0], code)),
);
