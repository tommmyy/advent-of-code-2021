import path from 'path';

import { compose, map, split, trim } from 'ramda';
import fs from 'fs-extra';

import { stringToList } from '../utils';

import { sevenSegmentSearch1, sevenSegmentSearch2, solveRow } from './day8';

const realData = fs.readFileSync(path.join(__dirname, './input.txt'), {
  encoding: 'utf-8',
});
const w = compose(xs => [...xs].sort(), split(''), trim);
const parseRow = compose(map(compose(map(w), split(/\s+/))), split(' | '));

const parse = map(parseRow);

const sanitizeData = compose(parse, stringToList);

const exerciseData =
  sanitizeData(`be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`);

const exerciseDataRow = sanitizeData(
  'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf',
);

const exerciseDataRowNums = [
  null,
  w('ab'),
  null,
  null,
  w('eafb'),
  null,
  null,
  w('abd'),
  w('acedgfb'),
  null,
];

describe('day8', () => {
  describe('sevenSegmentSearch1', () => {
    const testUtil = (input, expected, only) => {
      const fn = only ? it.only : it;
      fn(`should return ${expected}`, () => {
        expect(sevenSegmentSearch1(input)).toBe(expected);
      });
    };

    testUtil(exerciseData, 26);

    testUtil(sanitizeData(realData), 284);
  });

  describe('sevenSegmentSearch2', () => {
    const testUtil = (input, expected, only) => {
      const fn = only ? it.only : it;
      fn(`should return ${expected}`, () => {
        expect(sevenSegmentSearch2(input)).toBe(expected);
      });
    };

    describe('solveRow', () => {
      const solution = solveRow(exerciseDataRow[0][0]);

      it('gets obvious nums', () => {
        exerciseDataRowNums.forEach((x, i) => {
          if (x) {
            expect(solution[0][i]).toEqual(x);
          }
        }, exerciseDataRowNums);
      });

      it('gets A', () => {
        expect(solution[1].a).toEqual('d');
      });

      it('gets 3', () => {
        expect(solution[0][3]).toEqual(w('fbcad'));
      });

      it('gets G', () => {
        expect(solution[1].g).toEqual('c');
      });

      it('gets 2', () => {
        expect(solution[0][2]).toEqual(w('gcdfa'));
      });

      it('gets 5', () => {
        expect(solution[0][5]).toEqual(w('cdfbe'));
      });

      it('gets 0', () => {
        expect(solution[0][0]).toEqual(w('cagedb'));
      });

      it('gets 6', () => {
        expect(solution[0][6]).toEqual(w('cdfgeb'));
      });

      it('gets 9', () => {
        expect(solution[0][9]).toEqual(w('cefabd'));
      });
    });

    testUtil(exerciseDataRow, 5353);

    testUtil(exerciseData, 61229);

    testUtil(sanitizeData(realData), 973499);
  });
});
