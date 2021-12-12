import path from 'path';

import fs from 'fs-extra';
import { compose, join, map, split } from 'ramda';

import { stringToList } from '../utils';

import { findAllPaths, passagePathing } from './day12';

const sort = xs => xs.sort();

const parseRow = compose(sort, split('-'));
const parseData = compose(map(parseRow), stringToList);

const stringifyPaths = compose(join('\n'), sort, map(join(',')));

const realData = fs.readFileSync(path.join(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

describe('day12', () => {
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
        `start,A,b,A,c,A,end
start,A,b,A,end
start,A,b,end
start,A,c,A,b,A,end
start,A,c,A,b,end
start,A,c,A,end
start,A,end
start,b,A,c,A,end
start,b,A,end
start,b,end`,
      );
      testPaths(
        `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`,
        `start,HN,dc,HN,end
start,HN,dc,HN,kj,HN,end
start,HN,dc,end
start,HN,dc,kj,HN,end
start,HN,end
start,HN,kj,HN,dc,HN,end
start,HN,kj,HN,dc,end
start,HN,kj,HN,end
start,HN,kj,dc,HN,end
start,HN,kj,dc,end
start,dc,HN,end
start,dc,HN,kj,HN,end
start,dc,end
start,dc,kj,HN,end
start,kj,HN,dc,HN,end
start,kj,HN,dc,end
start,kj,HN,end
start,kj,dc,HN,end
start,kj,dc,end`,
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
      226,
    );
    testUtil(parseData(realData), 5874);
  });
});
