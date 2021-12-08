import {
  compose,
  difference,
  filter,
  find,
  findIndex,
  includes,
  length,
  map,
  reduce,
  sum,
} from 'ramda';
import { equalsLength } from 'ramda-extension';
import listToString from 'ramda-extension/lib/listToString';

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

const getObviousNums = data => {
  const foundNums = Array(10).fill(null);

  foundNums[1] = find(equalsLength(2))(data);
  foundNums[4] = find(equalsLength(4))(data);
  foundNums[7] = find(equalsLength(3))(data);
  foundNums[8] = find(equalsLength(7))(data);

  return foundNums;
};
const getA = (knownNums, segments) => {
  segments.a = difference(knownNums[7], knownNums[1])[0];

  return segments;
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

  getA(foundNums, segments);
  get3(foundNums, segments, combinations);
  getG(foundNums, segments);
  getB(foundNums, segments);
  get2and5(foundNums, segments, combinations);
  get6(foundNums, segments, combinations);
  get0and9(foundNums, segments, combinations);

  return [foundNums, segments];
};

const decode = (nums, code) =>
  Number(
    reduce(
      (acc, num) =>
        `${acc}${findIndex(
          x => listToString(x) === listToString(num),
          nums,
        )}`,
      '',
      code,
    ),
  );

export const sevenSegmentSearch2 = compose(
  sum,
  map(([combinations, code]) => decode(solveRow(combinations)[0], code)),
);
