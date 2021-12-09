import path from 'path';

import { compose, map, o, split, trim } from 'ramda';
import fs from 'fs-extra';

import { stringToList } from '../utils';

import { vulcanoTubes, vulcanoTubes2 } from './day9';

const parseData = compose(map(o(map(Number), split(''))), stringToList);

const exerciseData = parseData(`2199943210
3987894921
9856789892
8767896789
9899965678`);

const realData = parseData(
  fs.readFileSync(path.join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  }),
);

describe('day9', () => {
  describe('vulcanoTubes', () => {
    const testUtil = (input, expected, only) => {
      const fn = only ? it.only : it;
      fn(`should return ${expected}`, () => {
        expect(vulcanoTubes(input)).toBe(expected);
      });
    };

    testUtil(exerciseData, 15);

    testUtil(realData, 539);
  });

  describe('vulcanoTubes2', () => {
    const testUtil = (input, expected, only) => {
      const fn = only ? it.only : it;
      fn(`should return ${expected}`, () => {
        expect(vulcanoTubes2(input)).toBe(expected);
      });
    };

    testUtil(exerciseData, 15);

    testUtil(realData, 539);
  });
});
