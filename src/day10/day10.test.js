import path from 'path';

import fs from 'fs-extra';
import { listToString as s } from 'ramda-extension';

import { stringToList as parseData } from '../utils';

import { autocompleteScoring, parseRow, syntaxScoring } from './day10';

const exerciseData = parseData(`[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`);

const realData = parseData(
  fs.readFileSync(path.join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  }),
);

describe('day9', () => {
  describe('syntaxScoring', () => {
    const testUtil = (input, expected, only) => {
      const fn = only ? it.only : it;
      fn(`should return ${expected}`, () => {
        expect(syntaxScoring(input)).toBe(expected);
      });
    };

    describe('parseRow', () => {
      const testParseRow = (input, expectedValid, expectedInvalid, only) => {
        const fn = only ? it.only : it;
        fn(
          `Expected valid: ${expectedValid} and invalid: ${expectedInvalid}`,
          () => {
            const result = parseRow(input);
            expect(result.expected).toBe(expectedValid);
            expect(result.invalid).toBe(expectedInvalid);
          },
        );
      };

      testParseRow('{([(<{}[<>[]}>{[]{[(<()>', ']', '}');
      testParseRow('[{[{({}]{}}([{[{{{}}([]', ')', ']');
      testParseRow('[[<[([]))<([[{}[[()]]]', ']', ')');
      testParseRow('[<(<(<(<{}))><([]([]()', '>', ')');
    });

    testUtil(exerciseData, 26397);

    // testUtil(realData, 369105);
  });

  describe('autocompleteScoring', () => {
    describe('parseRow', () => {
      const testParseRow = (input, expected, only) => {
        const fn = only ? it.only : it;
        fn(`Expected stack to be: ${expected}`, () => {
          const result = parseRow(input);

          expect(s(result.autocomplete)).toBe(expected);
        });
      };

      testParseRow('[({(<(())[]>[[{[]{<()<>>', '}}]])})]');
      testParseRow('[(()[<>])]({[<{<<[]>>(', ')}>]})');
      testParseRow('(((({<>}<{<{<>}{[]{[]{}', '}}>}>))))');
      testParseRow('{<[[]]>}<{[{[{[]{()[[[]', ']]}}]}]}>');
      testParseRow('<{([{{}}[<[[[<>{}]]]>[]]', '])}>');
    });

    const testUtil = (input, expected, only) => {
      const fn = only ? it.only : it;
      fn(`should return ${expected}`, () => {
        expect(autocompleteScoring(input)).toBe(expected);
      });
    };

    testUtil(exerciseData, 288957);

    testUtil(realData, 3999363569);
  });
});
