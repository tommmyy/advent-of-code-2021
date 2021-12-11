import path from 'path';

import fs from 'fs-extra';
import { compose, join, map } from 'ramda';
import { listToString } from 'ramda-extension';

import { stringToListOfDigits } from '../utils';

import { dumboOctopus, dumboOctopus2, iterate } from './day11';

const parseData = stringToListOfDigits;
const dataToString = compose(join('\n'), map(listToString));

const exerciseData = parseData(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`);

const realData = fs.readFileSync(path.join(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

describe('day11', () => {
  describe('dumboOctopus', () => {
    describe('iterate', () => {
      const testIterate = (input, expected, expectedFlashes, only) => {
        const fn = only ? it.only : it;
        const expectedString = dataToString(parseData(expected));
        const parsedInput = parseData(input);

        fn(`should return ${expectedString}`, () => {
          const [state] = iterate(parsedInput);
          const result = dataToString(state);

          expect(result).toBe(expectedString);
        });
      };

      testIterate(
        `
        11111
        19991
        19191
        19991
        11111`,
        `
        34543
        40004
        50005
        40004
        34543
        `,
      );
      testIterate(
        `
        34543
        40004
        50005
        40004
        34543
        `,
        `
        45654
        51115
        61116
        51115
        45654
        `,
      );

      testIterate(
        `
      5483143223
      2745854711
      5264556173
      6141336146
      6357385478
      4167524645
      2176841721
      6882881134
      4846848554
      5283751526`,
        `
      6594254334
      3856965822
      6375667284
      7252447257
      7468496589
      5278635756
      3287952832
      7993992245
      5957959665
      6394862637`,
      );

      testIterate(
        `
      6707366222
      4377366333
      4475555827
      3496655709
      3500625609
      3509955566
      3486694453
      8865585555
      4865580644
      4465574644`,
        `
      7818477333
      5488477444
      5697666949
      4608766830
      4734946730
      4740097688
      6900007564
      0000009666
      8000004755
      6800007755
      `,
      );
    });

    const testUtil = (input, iterations, expected, only) => {
      const fn = only ? it.only : it;
      fn(`should return ${expected}`, () => {
        expect(dumboOctopus(input, iterations)).toBe(expected);
      });
    };

    testUtil(exerciseData, 100, 1656);
    testUtil(parseData(realData), 100, 1620);
  });

  describe('dumboOctopus2', () => {
    const testUtil = (input, expected, only) => {
      const fn = only ? it.only : it;
      fn(`should return ${expected}`, () => {
        expect(dumboOctopus2(input)).toBe(expected);
      });
    };

    testUtil(parseData(realData), 371);
  });
});
