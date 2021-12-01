import path from 'path';

import fs from 'fs-extra';

import { stringToListOfNumbers } from '../utils';

import { computeDepth, computeDepthFrames } from './day1';

const realData = fs.readFileSync(path.join(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

describe('day1', () => {
  describe('computeDepth', () => {
    const util = (input, expected) =>
      it(`should return ${expected}`, () => {
        expect(computeDepth(input)).toBe(expected);
      });

    util(
      stringToListOfNumbers(
        `
  199
  200
  208
  210
  200
  207
  240
  269
  260
  263`,
      ),
      7,
    );

    util(stringToListOfNumbers(realData), 1791);
  });

  describe('computeDepthFrames', () => {
    const util = (input, expected) =>
      it(`should return ${expected}`, () => {
        expect(computeDepthFrames(input)).toBe(expected);
      });

    util(
      stringToListOfNumbers(
        `
  199
  200
  208
  210
  200
  207
  240
  269
  260
  263`,
      ),
      5,
    );

    util(stringToListOfNumbers(realData), 1822);
  });
});
