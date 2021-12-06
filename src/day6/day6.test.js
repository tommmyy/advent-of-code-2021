import path from 'path';

import fs from 'fs-extra';

import { stringToNumbers } from '../utils';

import { countFish, lanternFish, lanternFishOpt } from './day6';

const realData = fs.readFileSync(path.join(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

const exerciseData = stringToNumbers('3,4,3,1,2');

describe('day6', () => {
  describe('lanternFish', () => {
    const testUtil = (input, days, expected) =>
      it(`should return ${expected}`, () => {
        expect(lanternFish(input, days)).toBe(expected);
      });

    testUtil(exerciseData, 18, 26);

    testUtil(exerciseData, 80, 5934);

    testUtil(stringToNumbers(realData), 80, 358214);
    // testUtil(stringToNumbers(realData), 256, 358214);
  });

  it('countFish', () => {
    expect(countFish(9)).toBe(2);

    expect(countFish(16)).toBe(3);

    expect(countFish(18)).toBe(4);

    expect(countFish(25)).toBe(7);

    expect(countFish(100)).toBe(4164);

    expect(countFish(256)).toBe(3369186778);
  });

  describe('lanternFishOpt', () => {
    const testUtil = (input, days, expected_, only) => {
      const fn = only ? it.only : it;

      const expected =
        expected_ < 400000 ? lanternFish(input, days) : expected_;

      fn(`should return ${expected} for ${days} days`, () => {
        expect(lanternFishOpt(input, days)).toBe(expected);
      });
    };

    testUtil(exerciseData, 0, 5);
    testUtil(exerciseData, 1, 5);
    testUtil(exerciseData, 2, 6);
    testUtil(exerciseData, 3, 7);
    testUtil(exerciseData, 4, 9);
    testUtil(exerciseData, 5, 10);
    testUtil(exerciseData, 9, 11);
    testUtil(exerciseData, 10, 12);
    testUtil(exerciseData, 11, 15);
    testUtil(exerciseData, 18, 26);

    testUtil(exerciseData, 80, 5934);
    testUtil(exerciseData, 256, 26984457539);

    testUtil(stringToNumbers(realData), 256, 1622533344325);
  });
});
