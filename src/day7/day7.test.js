import path from 'path';

import fs from 'fs-extra';

import { stringToNumbers } from '../utils';

import { treacheryOfWhales, treacheryOfWhalesCostly } from './day7';

const realData = fs.readFileSync(path.join(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

const exerciseData = stringToNumbers('16,1,2,0,4,2,7,1,2,14');

describe('day7', () => {
  describe('treacheryOfWhales', () => {
    const testUtil = (input, expected) =>
      it(`should return ${expected}`, () => {
        expect(treacheryOfWhales(input)).toBe(expected);
      });

    testUtil(exerciseData, 37);

    testUtil(stringToNumbers(realData), 340052);
  });

  describe('treacheryOfWhalesCostly', () => {
    const testUtil = (input, expected, only) => {
      const fn = only ? it.only : it;
      fn(`should return ${expected}`, () => {
        expect(treacheryOfWhalesCostly(input)).toBe(expected);
      });
    };

    testUtil(exerciseData, 168);

    testUtil(stringToNumbers(realData), 92948968);
  });
});
