import path from 'path';

import fs from 'fs-extra';

import { stringToListOfDigits } from '../utils';

import { chyton } from './day15';

const parseData = stringToListOfDigits;

const exerciseData = parseData(`1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`);

const realData = parseData(
  fs.readFileSync(path.join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  }),
);

jest.setTimeout(240000);

describe('day14', () => {
  describe('chyton', () => {
    const testUtil = (input, expected, only) => {
      const fn = only ? it.only : it;
      fn(`should return ${expected}`, async () => {
        const result = chyton(input);
        expect(result).toBe(expected);
      });
    };

    testUtil(exerciseData, 40);
  });
});
