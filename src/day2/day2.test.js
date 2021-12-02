import path from 'path';

import fs from 'fs-extra';

import { stringToList } from '../utils';

import { computeAim, computeDepth } from './day2';

const realData = fs.readFileSync(path.join(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

describe('day2', () => {
  describe('computeDepth', () => {
    const util = (input, expected) =>
      it(`should return ${expected}`, () => {
        expect(computeDepth(input)).toBe(expected);
      });

    util(
      stringToList(
        `
forward 5
down 5
forward 8
up 3
down 8
forward 2
        `,
      ),
      150,
    );

    util(stringToList(realData), 2187380);
  });

  describe('computeAim', () => {
    const util = (input, expected) =>
      it(`should return ${expected}`, () => {
        expect(computeAim(input)).toBe(expected);
      });

    util(
      stringToList(
        `
forward 5
down 5
forward 8
up 3
down 8
forward 2
        `,
      ),
      900,
    );

    util(stringToList(realData), 2086357770);
  });
});
