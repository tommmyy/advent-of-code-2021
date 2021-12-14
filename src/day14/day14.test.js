import path from 'path';

import fs from 'fs-extra';
import { compose, map, reduce, split } from 'ramda';

import { polymer } from './day14';

const parseData = compose(xs => {
  const [word, , ...rulesRaw] = xs;
  const rules = rulesRaw.map(x => x.split(' -> '));
  return { word, rules };
}, split('\n'));

const exerciseData = parseData(`NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`);

const realData = parseData(
  fs.readFileSync(path.join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  }),
);

jest.setTimeout(240000);

describe('day14', () => {
  describe('polymer', () => {
    const testUtil = (input, iterations, expected, only) => {
      const fn = only ? it.only : it;
      fn(`should return ${expected}`, async () => {
        const result = await polymer(input.rules, input.word, iterations);

        expect(result).toBe(expected);
      });
    };

    testUtil(exerciseData, 10, 1588);
    testUtil(realData, 10, 2899);
    testUtil(realData, 40, 3528317079545);
  });
});
