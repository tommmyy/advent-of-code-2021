import path from 'path';

import fs from 'fs-extra';
import { compose, map, reduce, split } from 'ramda';

import { display, transparentOrigami, transparentOrigami2 } from './day13';

const parseData = compose(
  reduce(
    (acc, next) => {
      const nextAcc = { ...acc };
      if (next.replace(/\s+/g, '') === '') {
        nextAcc.s = true;
      } else if (acc.s) {
        nextAcc.instructions = [...acc.instructions, next];
      } else {
        nextAcc.points = [
          ...acc.points,
          compose(map(Number), split(','))(next),
        ];
      }

      return nextAcc;
    },
    { instructions: [], points: [] },
  ),
  split('\n'),
);

const exerciseData = parseData(`6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`);

const realData = parseData(
  fs.readFileSync(path.join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  }),
);

describe('day13', () => {
  describe('transparentOrigami', () => {
    const testUtil = (input, expected, only) => {
      const fn = only ? it.only : it;
      fn(`should return ${expected}`, () => {
        expect(transparentOrigami(input)).toBe(expected);
      });
    };

    testUtil(exerciseData, 17);

    testUtil(realData, 669);
  });

  describe('transparentOrigami2', () => {
    const testUtil = (input, expected, only) => {
      const fn = only ? it.only : it;
      fn(`should return ${expected}`, () => {
        const result = transparentOrigami2(input);
        // eslint-disable-next-line no-console
        console.log(display(result));

        expect(result).toHaveLength(expected);
      });
    };

    testUtil(exerciseData, 16);

    testUtil(realData, 90);
  });
});
