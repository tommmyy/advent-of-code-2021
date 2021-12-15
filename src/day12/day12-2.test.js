import path from 'path';

import fs from 'fs-extra';
import { compose, join, map, split } from 'ramda';
import { listToString } from 'ramda-extension';

import { stringToList } from '../utils';

import { findAllPaths, passagePathing } from './day12-2';

const sort = xs => xs.sort();

const parseRow = compose(sort, split('-'));
const parseData = compose(map(parseRow), stringToList);

const stringifyPaths = compose(join('\n'), sort, map(join(',')));

const realData = fs.readFileSync(path.join(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

describe('day12-2', () => {
  describe('passagePathing', () => {
    const testUtil = (input, expected, only) => {
      const fn = only ? it.only : it;
      fn(`should return ${expected}`, () => {
        expect(passagePathing(input)).toBe(expected);
      });
    };

    describe('findAllPaths', () => {
      const testPaths = (input, expected, only) => {
        const fn = only ? it.only : it;
        fn(`should return ${expected}`, () => {
          const result = findAllPaths(parseData(input));

          expect(stringifyPaths(result)).toBe(
            [...expected.split('\n').sort()].join('\n'),
          );
        });
      };

      testPaths(
        `start-A
start-b
A-c
A-b
b-d
A-end
b-end`,
        `start,A,b,A,b,A,c,A,end
start,A,b,A,b,A,end
start,A,b,A,b,end
start,A,b,A,c,A,b,A,end
start,A,b,A,c,A,b,end
start,A,b,A,c,A,c,A,end
start,A,b,A,c,A,end
start,A,b,A,end
start,A,b,d,b,A,c,A,end
start,A,b,d,b,A,end
start,A,b,d,b,end
start,A,b,end
start,A,c,A,b,A,b,A,end
start,A,c,A,b,A,b,end
start,A,c,A,b,A,c,A,end
start,A,c,A,b,A,end
start,A,c,A,b,d,b,A,end
start,A,c,A,b,d,b,end
start,A,c,A,b,end
start,A,c,A,c,A,b,A,end
start,A,c,A,c,A,b,end
start,A,c,A,c,A,end
start,A,c,A,end
start,A,end
start,b,A,b,A,c,A,end
start,b,A,b,A,end
start,b,A,b,end
start,b,A,c,A,b,A,end
start,b,A,c,A,b,end
start,b,A,c,A,c,A,end
start,b,A,c,A,end
start,b,A,end
start,b,d,b,A,c,A,end
start,b,d,b,A,end
start,b,d,b,end
start,b,end`,
      );
    });

    testUtil(
      parseData(`fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`),
      3509,
    );

    testUtil(parseData(realData), 153592);
  });
});
