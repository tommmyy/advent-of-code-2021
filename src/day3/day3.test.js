import path from 'path';

import fs from 'fs-extra';

import { stringToList } from '../utils';

import { binaryDiagnostic, lifeSupport } from './day3';

const realData = fs.readFileSync(path.join(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

describe('day3', () => {
  describe('binaryDiagnostic', () => {
    const testBinaryDiagnostic = (input, expected) =>
      it(`should return ${expected}`, () => {
        expect(binaryDiagnostic(input)).toBe(expected);
      });

    testBinaryDiagnostic(
      stringToList(
        `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
        `,
      ),
      198,
    );

    testBinaryDiagnostic(stringToList(realData), 2250414);
  });

  describe('lifeSupport', () => {
    const testLifeSupport = (input, expected) =>
      it(`should return ${expected}`, () => {
        expect(lifeSupport(input)).toBe(expected);
      });

    testLifeSupport(
      stringToList(
        `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
        `,
      ),
      230,
    );

    testLifeSupport(stringToList(realData), 6085575);
  });
});
