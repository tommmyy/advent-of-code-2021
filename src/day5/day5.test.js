import path from 'path';

import fs from 'fs-extra';

import { stringToList } from '../utils';

import { hydrotermalVenture, hydrotermalVentureDiagonal } from './day5';

const realData = fs.readFileSync(path.join(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

const exerciseData = stringToList(`
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
        `);

describe('day5', () => {
  describe('hydrotermalVenture', () => {
    const testUtil = (input, expected) =>
      it(`should return ${expected}`, () => {
        expect(hydrotermalVenture(input)).toBe(expected);
      });

    testUtil(exerciseData, 5);

    testUtil(stringToList(realData), 5280);
  });

  describe('hydrotermalVentureDiagonal', () => {
    const testUtil = (input, expected) =>
      it(`should return ${expected}`, () => {
        expect(hydrotermalVentureDiagonal(input)).toBe(expected);
      });

    testUtil(exerciseData, 12);

    testUtil(stringToList(realData), 16716);
  });
});
